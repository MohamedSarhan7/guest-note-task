const { Worker } = require('worker_threads');
import { IPushNotification, sendNotification } from '../../modules/firebase/firebase.service'
import prismaService from "../../modules/prisma/prisma.service";

async function fetchUserData() {
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 2);

  const users = await prismaService.user.findMany(
    {
      where: {
        receive_daily_notifi: true,
        fcmTokens: {
          some: { token: { gt: '' } }
        },
      },
      select: {
        name: true,
        fcmTokens: { select: { token: true } },
        notes: {
          where: { avilable: true, created_at: { gt: yesterday, lte: today } },
          select: {
            created_at: true,
            note: {
              select: {
                type: {
                  select: { name: true, id: true }
                }
              }
            }
          }
        },
      },
      // include:{notes:{},fcmTokens:true}


    }


  )

  return users;
}

async function processUsers(userData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/common/utils/worker.ts', { workerData: userData });
    worker.on('message', (msg) => {
      // console.log(msg)
      resolve(msg)
      if (msg.type === 'done') {
        worker.terminate();
      }
    })

    worker.on('error', (msg) => {
      console.log(msg)
      reject(msg)
    })
  })

}

export async function main() {
  const userData = await fetchUserData();
  const users = await processUsers(userData);
  // console.table( users)
  await sendNotification(users as IPushNotification[]);
}
