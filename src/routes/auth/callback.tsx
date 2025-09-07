import { useAuth } from '@/hooks/auth'
import { useAuthStore } from '@/stores/auth'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/auth/callback')({
  component: OAuthCallbackHandler,
})

// Componente para manejar callbacks OAuth automáticamente
function OAuthCallbackHandler() {

  const navigate = Route.useNavigate()
  const { isAuthenticated } = useAuth()

  const handleOAuthCallback = useAuthStore(state => state.handleOAuthCallback)

  useEffect(() => {
    handleOAuthCallback()
  }, [handleOAuthCallback])

  if (isAuthenticated) {
    navigate({ to: '/', replace: true })

    return <div>Autenticación exitosa. Redirigiendo...</div>
  }

  return null
}
