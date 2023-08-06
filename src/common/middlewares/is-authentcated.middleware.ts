// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';

import {catchAsyncErrors} from '../../common/utils/index';
import { AuthRequest, JwtPayload } from '../../common/types/index';
import { Response, NextFunction } from 'express'
import createHttpError from 'http-errors';

export const isAuthentcated = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers["token"]||req.headers["authorization"];

  if (!token) {
    throw createHttpError(403, "A token is required for authentication")
  }
  
  try {
    const decoded = jwt.verify(token as string, process.env.TOKEN_KEY);
    req.user = decoded as JwtPayload;
    // console.log(req.user)
  } catch (err) {
    throw createHttpError(403, "Invalid Token")
    // return res.status(401).send("Invalid Token");
  }
  return next();
}
);

// export default auth