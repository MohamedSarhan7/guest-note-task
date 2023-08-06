import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import createException from 'http-errors';
// ----------------------------------------------------------------
import { createNote } from './note.service';
import {catchAsyncErrors} from '../../common/utils/index';
import { CreateNoteDto } from './dto/index';
import { AuthRequest } from '../../common/types/index';

export const create = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {

  if (!req.files) throw createException(400, 'you must provide a media file')
  const files = Object.values(req.files);
  const users_id=[];
  if(req.body.users_id){

    req.body.users_id.length == 1 ? users_id.push(parseInt(req.body.users_id)) : req.body.users_id.map((item) => users_id.push(parseInt(item)))
  }
  
  const note = new CreateNoteDto(
    {
      title: req.body.title,
      body: req.body.body,
      type_id: parseInt(req.body.type_id),
      users_id: users_id.length>0?users_id:undefined
    });

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
console.log(req.user)
  const response = await createNote(note, files, req.user);
  return res.json(response)
})