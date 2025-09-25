import React from 'react'
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  GraduationCap,
  PlayCircle,
  StopCircle,
  Settings,
  ExternalLink,
  Circle
} from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { Notification } from '@/domain/notifications'
import { NotificationType, NotificationPriority } from '@/domain/notifications'

interface NotificationCardProps {
  notification: Notification
  onMarkAsRead?: (notificationId: string) => void
  onAction?: (actionUrl: string) => void
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onAction
}) => {
  const getNotificationIcon = (type: NotificationType) => {
    const iconProps = { className: "h-4 w-4" }

    switch (type) {
      case NotificationType.TASK_DUE_SOON:
        return <Clock {...iconProps} />
      case NotificationType.TASK_OVERDUE:
        return <AlertTriangle {...iconProps} />
      case NotificationType.EXAM_REMINDER:
        return <Calendar {...iconProps} />
      case NotificationType.ASSIGNMENT_GRADED:
        return <GraduationCap {...iconProps} />
      case NotificationType.PERIOD_STARTING:
        return <PlayCircle {...iconProps} />
      case NotificationType.PERIOD_ENDING:
        return <StopCircle {...iconProps} />
      case NotificationType.SYSTEM_UPDATE:
        return <Settings {...iconProps} />
      default:
        return <Circle {...iconProps} />
    }
  }

  const getPriorityBadgeVariant = (priority: NotificationPriority) => {
    switch (priority) {
      case NotificationPriority.CRITICAL:
        return 'destructive'
      case NotificationPriority.HIGH:
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const handleCardClick = () => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id)
    }
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (notification.actionUrl && onAction) {
      onAction(notification.actionUrl)
    }
  }

  return (
    <Card
      id={`notification-card-${notification.id}`}
      className={cn(
        "relative cursor-pointer transition-all duration-200 hover:shadow-md",
        !notification.isRead && "border-l-4 border-l-blue-500",
        // getPriorityColor(notification.priority)
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {getNotificationIcon(notification.type)}
            <h4 className={cn(
              "text-sm font-medium truncate",
              !notification.isRead && "font-semibold"
            )}>
              {notification.title}
            </h4>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {notification.isCritical() && (
              <Badge variant={getPriorityBadgeVariant(notification.priority)} className="text-xs">
                Critical
              </Badge>
            )}
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {notification.getFormattedAge()}
            </span>
          </div>
        </div>

        {/* Message */}
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {notification.message}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {notification.getTypeDisplayName()}
            </Badge>
            {notification.isRead && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-xs">Read</span>
              </div>
            )}
          </div>

          {notification.hasAction() && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={handleActionClick}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Action
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}