import { NextFunction, Request, Response } from 'express';
import { validate, ValidationError } from "class-validator";
import createExeption from 'http-errors';
// ----------------------------------------------------------------
import { authLogin, authRegister } from './auth.service';
import { LoginDto } from './dto/index';
import catchAsyncErrors from '../../common/utils/catch-async-errors';
import { RegisterDto } from './dto/register.dto';
// ----------------------------------------------------------------

export const login = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  const loginDto = new LoginDto({...req.body})

  const err = await validate(loginDto, { validationError: { target: false, } });

  if (err.length > 0) {
    const errors = err.map((error: ValidationError) => {
      return {
        "path": error.property,
        "errors": Object.values(error.constraints)
      }
    }
    )
    return next(createExeption(400, errors))
  }
  const response = await authLogin(loginDto)
  return res.json(response);


}
)

export const register = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction): Promise<any> => {

  const registerDto = new RegisterDto({ ...req.body })

  const err = await validate(registerDto, { validationError: { target: false, } });

  if (err.length > 0) {
    const errors = err.map((error: ValidationError) => {
      return {
        "path": error.property,
        "errors": Object.values(error.constraints)
      }
    }
    )
    return next(createExeption(400, errors))
  }
  const response = await authRegister(registerDto)
  return res.json(response);
}
)

