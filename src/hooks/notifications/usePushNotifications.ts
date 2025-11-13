import type { NotificationsCountResponseDto } from '@/api/notifications';
import { env } from '@/env';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

export interface SocketNotification {
  id: { value: string }
  userId: { value: string }
  title: string
  message: string
  type: { value: string }
  priority: { value: string }
  isRead: boolean
  createdAt: string
  readAt: any
  taskId: string
  subjectId: string
  actionUrl: any
  scheduledFor: any
}

export const usePushNotifications = (userId: string | null) => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);
  const isConnecting = useRef(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userId || isConnecting.current) return;

    isConnecting.current = true;

    // Conectar al WebSocket
    const socketInstance = io(env.VITE_NOTIFICATIONS_SERVICE_URL || 'http://localhost:3002', {
      query: { userId },
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      console.log('✅ WebSocket conectado:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ WebSocket desconectado');
      setIsConnected(false);
    });

    // Escuchar notificaciones
    socketInstance.on('new_notification', (notification: SocketNotification) => {
      console.log('📬 Nueva notificación:', notification);

      // 1️⃣ Invalidar queries para actualizar la lista
      qc.invalidateQueries({ queryKey: ['notifications', userId] });
      // qc.invalidateQueries({ queryKey: ['notifications', 'unreadCount'] });
      qc.setQueryData(
        ['notifications', 'unreadCount'],
        (old: NotificationsCountResponseDto) => ({ ...old, unreadCount: (old.unreadCount || 0) + 1 })
      );

      // 2️⃣ Mostrar toast en la app
      toast.info(notification.title, {
        description: notification.message,
        duration: 5000,
        action: notification.actionUrl ? {
          label: 'Ver',
          onClick: () => {
            navigate({ to: notification.actionUrl! });
          },
        } : undefined,
      });

      // 3️⃣ Mostrar notificación nativa del navegador
      if (Notification.permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/android-chrome-192x192.png',
          tag: notification.id.value, // Evita duplicados
        });
      } else if (Notification.permission === 'default') {
        // Pedir permiso solo la primera vez
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification(notification.title, {
              body: notification.message,
              icon: '/android-chrome-192x192.png',
            });
          }
        });
      }


    });

    socketRef.current = socketInstance;

    return () => {
      console.log('🧹 Limpiando socket...');
      socketInstance.removeAllListeners();
      socketInstance.disconnect();
      isConnecting.current = false;
      socketRef.current = null;
    };
  }, [userId, navigate, qc]);

  return {
    isConnected
  };
};