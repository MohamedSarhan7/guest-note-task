const jwt = require("jsonwebtoken");
import catchAsyncErrors from '../../common/utils/catch-async-errors';
import { AuthRequest } from '../../common/types/auth-request.types';
import { Response, NextFunction } from 'express'
import createHttpError from 'http-errors';

const auth = catchAsyncErrors(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers["token"]||req.headers["authorization"];

  if (!token) {
    throw createHttpError(403, "A token is required for authentication")
  }
  
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    console.log(req.user)
  } catch (err) {
    throw createHttpError(403, "Invalid Token")
    // return res.status(401).send("Invalid Token");
  }
  return next();
}
);

export default auth