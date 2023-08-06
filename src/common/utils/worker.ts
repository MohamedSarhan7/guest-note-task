// import { buildNotificationArray } from "./src/commom/utils/notifications";

const {  isMainThread, parentPort, workerData } = require('worker_threads');

const buildNotificationArray = (users, title) => {
  const notifcations = []
  users.forEach(user => {
    if (user.fcmTokens) {
      user.fcmTokens.forEach((token) => {
        const notification = {
          token: token.token,
          notification: {
            title: title || "new notification",
            body: "body",
          }
        }
        notifcations.push(notification);
      });

    }
  })
  return notifcations
}
async function processChunk(users) {
// console.table(users)


    const noteTypes = {};
    users.forEach(user => {
      user.notes.forEach(note => {
        if (!noteTypes[note.note.type.name]) {
          noteTypes[note.note.type.name] = 1;
        } else {
          noteTypes[note.note.type.name] += 1;
        }
      })
    })

    let userStr = 'You got new:'
    Object.entries(noteTypes).map(noteType => {
      userStr += ` ${noteType[1]} ${noteType[0]}, `
    })

    const notificationArr= buildNotificationArray(users,userStr)
  
  return notificationArr;
}

if (!isMainThread) {
  processChunk(workerData)
    .then((usersNotification) => {
      parentPort.postMessage(usersNotification);
    })
    .catch((error) => {
      console.error(error);
    });
}



