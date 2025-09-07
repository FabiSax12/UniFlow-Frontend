import axios, { type AxiosInstance } from "axios"
import { API_ENDPOINTS } from "./endpoints"
import { env } from "@/env"


const createApiClient = (baseURL: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
    timeout: 10000, // 10 segundos
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Request interceptor - Agregar token de autenticación de usuario y para Azure APIM
  client.interceptors.request.use(
    (config) => {

      config.headers["Ocp-Apim-Subscription-Key"] = env.VITE_APIM_TOKEN

      // OAuth token
      const auth_storage = localStorage.getItem("auth-storage")

      if (!auth_storage) return config

      const token = auth_storage ? JSON.parse(auth_storage)?.state?.authToken : null

      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  return client
}

const academicApi = createApiClient(API_ENDPOINTS.academic.base)
const tasksApi = createApiClient(API_ENDPOINTS.tasks.base)
const notificationsApi = createApiClient(API_ENDPOINTS.notifications.base)

export { academicApi, tasksApi, notificationsApi }