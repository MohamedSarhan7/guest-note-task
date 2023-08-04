import type { ErrorRequestHandler } from "express";
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errorMessage = statusCode !== 500 ? err.message : 'Internal Server Error';
  res.status(statusCode).json({ error: errorMessage });

}

export default errorHandler;