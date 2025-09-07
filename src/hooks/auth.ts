import { useAuthStore } from "@/stores/auth"

export const useAuth = () => {
  const store = useAuthStore()
  return {
    // Estado
    ...store,
    // Getter computado como propiedad
    isAuthenticated: store.isAuthenticated()
  }
}