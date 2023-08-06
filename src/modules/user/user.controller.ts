import { NextFunction, Request, Response } from "express";
import createException from 'http-errors';
import app, { uploadImage } from "../../modules/firebase/firebase.service";
import catchAsyncErrors from "../../common/utils/catch-async-errors";
import { AuthRequest } from "../../common/types/auth-request.types";
import prismaService from "../prisma/prisma.service";
import { UpdateUserDto } from "./dto/index";
import { validate, ValidationError } from 'class-validator';
import { updateUserService, timelineService } from "./user.service";
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

export const updateUser = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {

  if (!Object.keys(req.body).length) throw createException(400)
  const user = new UpdateUserDto({
    name: req.body.name,
    fcmToken: req.body.fcmToken,
    receive_daily_notifi: req.body.receive_daily_notifi
  });

  const err = await validate(user, { validationError: { target: false, } });

  if (err.length > 0) {
    const errors = err.map((error: ValidationError) => {
      return {
        "path": error.property,
        "errors": Object.values(error.constraints)
      }
    }
    )
    return next(createException(400, errors))
  }
  // console.log(user)
  const response = await updateUserService(user, req.user);
  return res.json(response)

})

export const getTimeLine = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log(req.user)
  console.log(req.query)
  // const take = req.body.take
  // const skip = req.body.skip

  const types = req.query.types? Object.values(req.query.types).map(Number):undefined

  console.log(types)
  const response = await timelineService(req.user, types, req.body.take, req.body.skip)
  return res.json(response);

})