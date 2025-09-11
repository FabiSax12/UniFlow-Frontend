import { env } from '@/env'
import { API_ENDPOINTS } from '@/lib/api/endpoints'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Configuración de OAuth providers
const OAUTH_CONFIG: Record<"google" | "github", any> = {
  google: {
    clientId: env.VITE_GOOGLE_CLIENT_ID,
    clientSecret: env.VITE_GOOGLE_CLIENT_SECRET,
    redirectUri: `${window.location.origin}/auth/callback`,
    scope: 'openid email profile',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v2/userinfo'
  },
  github: {
    clientId: env.VITE_GITHUB_CLIENT_ID,
    clientSecret: env.VITE_GITHUB_CLIENT_SECRET,
    redirectUri: `${window.location.origin}/auth/callback`,
    scope: 'read:user user:email',
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: API_ENDPOINTS.academic.base + '/v1/access-token',
    userInfoUrl: 'https://api.github.com/user'
  }
}

interface AuthState {
  // Estado
  authToken: string | null
  userInfo: any | null
  provider: 'google' | 'github' | null
  loading: boolean
  error: string | null

  // Getters computados
  isAuthenticated: () => boolean
  // Funciones
  loginWithProvider: (provider: 'google' | 'github') => Promise<void>
  exchangeCodeForToken: (provider: 'google' | 'github', code: string, config: any) => Promise<any>
  getUserInfo: (provider: 'google' | 'github', accessToken: string, config: any) => Promise<any>
  handleOAuthCallback: () => Promise<boolean>
  makeAuthenticatedRequest: (url: string, options?: RequestInit) => Promise<any>
  logout: () => void
  clearError: () => void
  refreshUserInfo: () => Promise<void>
}

// Zustand store para autenticación
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Estado
      authToken: null,
      userInfo: null,
      provider: null,
      loading: false,
      error: null,

      // Getters computados
      isAuthenticated: () => !!get().authToken,

      // Función para iniciar login con un provider
      loginWithProvider: async (providerName) => {
        const config = OAUTH_CONFIG[providerName]
        if (!config) {
          set({ error: 'Provider no configurado' })
          return
        }

        try {
          // Generar state único para CSRF protection
          const state = `${providerName}:${Math.random().toString(36).substring(2)}`
          sessionStorage.setItem('oauth_state', state)

          const params = new URLSearchParams({
            client_id: config.clientId,
            redirect_uri: config.redirectUri,
            scope: config.scope,
            state,
            ...(providerName === 'google' && {
              response_type: 'code',
              access_type: 'offline',
              prompt: 'consent'
            })
          })

          const authUrl = `${config.authUrl}?${params.toString()}`
          window.location.href = authUrl
        } catch (error: unknown) {
          set({ error: `Error iniciando login: ${error instanceof Error ? error.message : 'Unknown error'}` })
        }
      },

      // Intercambiar código por token
      exchangeCodeForToken: async (providerName, code, config) => {
        let body: BodyInit;
        if (providerName === "google") {
          const params = new URLSearchParams({
            client_id: config.clientId,
            client_secret: config.clientSecret,
            code,
            redirect_uri: config.redirectUri,
            grant_type: 'authorization_code'
          });
          body = params;
        } else {
          body = JSON.stringify({ code });
        }

        const requestInit: RequestInit = providerName === 'google' ? {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body
        } : {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Ocp-Apim-Subscription-Key': env.VITE_APIM_TOKEN,
          },
          body
        }

        console.log("Request Init:", requestInit);
        const response = await fetch(config.tokenUrl, requestInit)

        if (!response.ok) {
          throw new Error(`Error intercambiando código: ${response.status}`)
        }

        const data = await response.json()

        if (!data.access_token) {
          throw new Error('No se recibió access_token')
        }

        return data
      },

      // Obtener información del usuario
      getUserInfo: async (providerName, accessToken, config) => {
        const headers = {
          'Authorization': `Bearer ${accessToken}`
        } as any

        // GitHub requiere User-Agent
        if (providerName === 'github') {
          headers['User-Agent'] = 'OAuth-App'
        }

        const response = await fetch(config.userInfoUrl, { headers })

        if (!response.ok) {
          throw new Error(`Error obteniendo info del usuario: ${response.status}`)
        }

        const userData = await response.json()

        // Para GitHub, también necesitamos obtener el email si es privado
        if (providerName === 'github' && !userData.email) {
          try {
            const emailResponse = await fetch('https://api.github.com/user/emails', {
              headers
            })

            if (emailResponse.ok) {
              const emails = await emailResponse.json() as any[]
              const primaryEmail = emails.find(email => email.primary)
              if (primaryEmail) {
                userData.email = primaryEmail.email
              }
            }
          } catch (error) {
            console.warn('No se pudo obtener email de GitHub:', error)
          }
        }

        return userData
      },

      // Manejar callback de OAuth
      handleOAuthCallback: async () => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')

        console.log('state', state?.split(':'))

        if (!code || !state) return false

        set({ loading: true, error: null })

        try {
          // Verificar state CSRF
          const savedState = sessionStorage.getItem('oauth_state')
          if (state !== savedState) {
            throw new Error('State mismatch - posible ataque CSRF')
          }

          // Extraer provider del state
          const currentProvider = state.split(':')[0] as 'google' | 'github'
          const config = OAUTH_CONFIG[currentProvider]

          console.log('Current Provider:', currentProvider)

          if (!config) {
            throw new Error('Provider no válido')
          }

          // Intercambiar código por token
          const tokenData = await get().exchangeCodeForToken(currentProvider, code, config)

          // Obtener información del usuario
          const userData = await get().getUserInfo(currentProvider, tokenData.access_token, config)

          // Actualizar estado
          set({
            authToken: tokenData.access_token,
            userInfo: userData,
            provider: currentProvider,
            loading: false,
            error: null
          })

          // Limpiar storage temporal
          sessionStorage.removeItem('oauth_state')

          // Limpiar URL
          window.history.replaceState({}, document.title, window.location.pathname)

          return true

        } catch (error: unknown) {
          console.error('Error en callback OAuth:', error)
          set({
            loading: false,
            error: `Error al obtener token: ${error instanceof Error ? error.message : 'Error desconocido'}`
          })
          return false
        }
      },

      // Función para hacer requests autenticados
      makeAuthenticatedRequest: async (url, options = {}) => {
        const { authToken, provider } = get()

        if (!authToken) {
          throw new Error('No hay token de autenticación disponible')
        }

        const response = await fetch(url, {
          ...options,
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
            'X-Auth-Provider': provider || 'unknown',
            ...options.headers
          }
        })

        if (!response.ok) {
          throw new Error(`Error en request: ${response.status}`)
        }

        return response.json()
      },

      // Función para logout
      logout: () => {
        set({
          authToken: null,
          userInfo: null,
          provider: null,
          error: null
        })
        sessionStorage.removeItem('oauth_state')
      },

      // Limpiar errores
      clearError: () => set({ error: null }),

      // Función para refrescar datos del usuario
      refreshUserInfo: async () => {
        const { authToken, provider } = get()

        if (!authToken || !provider) return

        set({ loading: true })

        try {
          const config = OAUTH_CONFIG[provider]
          const userData = await get().getUserInfo(provider, authToken, config)
          set({ userInfo: userData, loading: false })
        } catch (error) {
          console.error('Error refrescando datos:', error)
          set({ loading: false, error: 'Error al refrescar datos del usuario' })
        }
      }
    }),
    {
      name: 'auth-storage',
      // Solo persistir datos seguros (no el error ni loading)
      partialize: (state) => ({
        authToken: state.authToken,
        userInfo: state.userInfo,
        provider: state.provider
      })
    }
  )
)
