import { NextFunction, Request, Response } from "express";
import createException from 'http-errors';
import app, { uploadImage } from "../../modules/firebase/firebase.service";
import catchAsyncErrors from "../../common/utils/catch-async-errors";
import { AuthRequest } from "../../common/types/auth-request.types";
import prismaService from "../prisma/prisma.service";
export const uploadUserImage = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {

  if (!req.file) throw createException(400, 'you must provide a file')

  try {
    const file = req.file;
    const bucket = app.storage().bucket();
    const filename = `${Math.floor(Date.now() / 1000)}_` + file.originalname.replace(/ /g, "_");

    const imageUrl = await uploadImage(file, bucket, filename);
    console.log(imageUrl)
    await prismaService.user.update({ where: { email: req.user.email }, data: { image: imageUrl } })
    // console.log("cont", imageUrl)
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.log(error)
    next(createException(500, 'Failed to upload file.'))
  }

})