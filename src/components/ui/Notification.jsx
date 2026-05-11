import { Children } from "react";

export function NotificationContainer({ Children }) {
  return (
    <div id="notification-container" className="notification-container">
      {Children}
    </div>
  );
}

export function Notification(message, type = "info", duration = 5000) {
  return (
    <NotificationContainer>
      <div className={`notification notification-${type}`}>
        <p>
          {message} - {duration}ms
        </p>
      </div>
    </NotificationContainer>
  );
}

export function InfoNotification(message, duration = 5000) {
  return Notification(message, "info", duration);
}

export function SuccessNotification(message, duration = 5000) {
  return Notification(message, "success", duration);
}

export function WarningNotification(message, duration = 5000) {
  return Notification(message, "warning", duration);
}

export function ErrorNotification(message, duration = 5000) {
  return Notification(message, "error", duration);
}
