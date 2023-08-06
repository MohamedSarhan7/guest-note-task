import * as admin from 'firebase-admin'
import * as dotenv from 'dotenv';
import { Bucket } from '@google-cloud/storage';
dotenv.config();
const serviceAccount = require("../../../serviceAccountKey.json")

export interface IPushNotification {
  token: string,
  notification: {
    title: string,
    body: string
  }
}

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
})

export const uploadImage = async (file: Express.Multer.File, bucket: Bucket, filename: string) => {
  return new Promise((resolve, reject) => {
    const fileUpload = bucket.file(filename);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });
    blobStream.on('error', (error) => {
      console.log(error)
      reject(error)
    });
    blobStream.on('finish', () => {
      // console.log(data)
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`;
      resolve(publicUrl);
    }
    );
    blobStream.end(file.buffer);
  })




}


export const sendNotification = async (notifcations: IPushNotification[]) => {
  if (!notifcations.length) return

  admin.messaging().sendAll(notifcations)
    .then(response => console.log(response.responses))
    .catch(error => console.log(error));
}
export default firebaseAdmin

