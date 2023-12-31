import type { ErrorRequestHandler } from "express";
import multer from "multer";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.message)
  const statusCode = err.statusCode || 500;
  const errorMessage = statusCode !== 500 ? err.message : 'Internal Server Error';
  const errors = Object.values({ ...err })

  if(err instanceof multer.MulterError){
    return res.status(400).json({
      status: 400,
      message: err.message
    })
  }

  return res.status(statusCode).json({ message: errorMessage, errors });

}
