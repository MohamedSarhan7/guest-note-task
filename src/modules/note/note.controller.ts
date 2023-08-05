import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from "class-validator";
import createException from 'http-errors';
// ----------------------------------------------------------------
import { createNote } from './note.service';
import catchAsyncErrors from '../../common/utils/catch-async-errors';
import { CreateNoteDto } from './dto/index';
import { AuthRequest } from '../../common/types/auth-request.types';

export const create = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {

  if (!req.files.length) throw createException(400, 'you must provide a media file')

  const note = new CreateNoteDto({ ...req.body });
  const err = await validate(note, { validationError: { target: false, } });

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

  const response = await createNote(note,req.files,req.user);
  return res.json(response)
})