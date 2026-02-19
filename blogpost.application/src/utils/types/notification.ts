export type NotificationType = "success" | "info" | "warning" | "error";

export interface NotificationPayload {
  type: NotificationType;
  message: string;
}

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
}
