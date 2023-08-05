import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = statusCode !== 500 ? err.message : 'Internal Server Error';
  const errors = Object.values({ ...err })
  res.status(statusCode).json({ message: errorMessage, errors });

}

export default errorHandler;