export const buildNotificationArray = (users: any[], title?: string, body?: string) => {
  const notifcations = []
  users.forEach(user => {
    if (user.fcmTokens) {
      user.fcmTokens.forEach((token) => {
        const notification = {
          token: token.token,
          notification: {
            title: title||"new notification",
            body: body || "body",
          }
        }
        notifcations.push(notification);
      });

    }
  })
  return notifcations
}

