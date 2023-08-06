import prismaService from "../prisma/prisma.service";
import { JwtPayload } from "../../common/types/auth-request.types";
import { CreateNoteDto } from "./dto/index";
import createHttpError from "http-errors";
import app, { uploadImage } from "../../modules/firebase/firebase.service";

export const createNote = async (note: CreateNoteDto, files: Express.Multer.File[], user: JwtPayload) => {
  const type = await prismaService.noteType.findUnique({ where: { id: note.type_id } })
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

  const userNote = await prismaService.noteToUser.createMany({ data: noteToUsers })
  const urls = await uploadImages(files, newNote.id)

  await prismaService.media.createMany({ data: urls });

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