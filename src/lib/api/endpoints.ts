import { env } from "@/env";

export const API_ENDPOINTS = {
  academic: {
    base: `${env.VITE_API_BASE_URL}/academic`,
    students: '/students',
    periods: '/periods',
    subjects: '/subjects'
  },
  tasks: {
    base: `${env.VITE_API_BASE_URL}/tasks`,
    tasks: '/tasks'
  },
  notifications: {
    base: `${env.VITE_API_BASE_URL}/notifications`,
    notifications: '/notifications'
  }
}