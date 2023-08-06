import prismaService from "../prisma/prisma.service";
import { JwtPayload } from "../../common/types/auth-request.types";
import { CreateNoteDto } from "./dto/index";
import createHttpError from "http-errors";
import app, {  sendNotification, uploadImage } from "../../modules/firebase/firebase.service";

export const createNote = async (note: CreateNoteDto, files: Express.Multer.File[], user: JwtPayload) => {
  
  const type = await getNoteTypebyId(note.type_id)
  if (!type) throw createHttpError(404, "No type was Found with id: " + note.type_id)
  
  // create new note
  const newNote = await prismaService.note.create({
    data: {
      title: note.title,
      body: note.body,
      type_id: type.id,
      creator_id: user.id,
    }
  })

  //  append users_id to NoteToUser
  const noteToUsers = [];

  note.users_id.forEach((user_id) => {
    noteToUsers.push({
      note_id: newNote.id,
      user_id: user_id
    })
  })

  // insert usernotes 
  const userNote = await prismaService.noteToUser.createMany({ data: noteToUsers })

  // upload media to fb
  const urls = await uploadImages(files, newNote.id)

  // insert media to db 
  await prismaService.media.createMany({ data: urls });

                // send Notification----------------
  // get users from db
  const users = await prismaService.user.findMany({
    where: {
      id:
        { in: note.users_id }
    },
    include: { fcmTokens: { select: { token: true } } }
  })

  //  send notification fb
  const notifications = buildNotificationArray(users, note.title)
  sendNotification(notifications)
  

  newNote['media'] = urls;
  return newNote;
}


const uploadImages = async (files: Express.Multer.File[], note_id: number) => {
  const bucket = app.storage().bucket();
  const urlsPromises = files.map((file) => {
    const filename = `${Math.floor(Date.now() / 1000)}_` + file.originalname.replace(/ /g, "_");
    return uploadImage(file, bucket, filename)
  }
  )
  const urls = await Promise.all(urlsPromises)
  return urls.map((url) => {
    return { url: url as string, note_id }
  })

}

const buildNotificationArray = (users: any[], title: string) => {
  const notifcations = []
  users.forEach(user => {
    if (user.fcmTokens) {
      user.fcmTokens.forEach((token) => {
        const notification = {
          token: token.token,
          notification: {
            title: "you have recived new note",
            body: title
          }
        }
        notifcations.push(notification);
      });

    }
  })
  return notifcations
}

const getNoteTypebyId = async(id:number)=>{
  return await prismaService.noteType.findUnique({ where: { id } })
}