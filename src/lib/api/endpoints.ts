import { env } from "@/env";

export const API_ENDPOINTS = {
  academic: {
    base: `${env.VITE_API_BASE_URL}/academic`,
    students: '/v1/students',
    periods: '/v1/periods',
    subjects: '/v1/subjects'
  },
  tasks: {
    base: `${env.VITE_API_BASE_URL}/tasks`,
    tasks: '/v1/tasks'
  },
  notifications: {
    base: `${env.VITE_API_BASE_URL}/notifications`,
    notifications: '/v1/notifications'
  }
}