import prismaService from "../../modules/prisma/prisma.service"
export const insertNoteTypesIfNotExists = async () => {
  const typesCount = await prismaService.noteType.count();
  if (typesCount < 1) {
    await prismaService.noteType.createMany({
      data: [
        { name: 'invitation' },
        { name: 'congrats' },
      ]
    })
  }
}
  // console.log(last)

  
//   console.log()
//   console.table(users.length)
//   console.table(users[0].fcmTokens)
//   console.table(users[0].notes);
//   console.table(users[0].notes[0]);

//   const noteTypes = {};
//   // const Notifcation 
//   users.forEach(user => {
//     user.notes.forEach(note => {
//       if (!noteTypes[note.note.type.name]) {
//         noteTypes[note.note.type.name] = 1;
//       } else {
//         noteTypes[note.note.type.name] += 1;
//       }
//     })
//   })

//   let userStr = 'You got new:'
//   Object.entries(noteTypes).map(noteType => {
//     console.log()
//     userStr += ` ${noteType[1]} ${noteType[0]}, `
//   })
//   console.log(noteTypes)
//   console.log('----------------------------------------------------------------')
//   console.log(userStr)
// }


// const buildNotificationArray = (users: any[], title: string) => {
//   const notifcations = []
//   users.forEach(user => {
//     if (user.fcmTokens) {
//       user.fcmTokens.forEach((token) => {
//         const notification = {
//           token: token.token,
//           notification: {
//             title: "you have recived new note",
//             body: title
//           }
//         }
//         notifcations.push(notification);
//       });

//     }
//   })
//   return notifcations
// }

// const getStats = (users: any[]) => {
//   const statsStr = [];
//   users.forEach(user => {
//     statsStr.push(user.notes.length);
//   })
// }