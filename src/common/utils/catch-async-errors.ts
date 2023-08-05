import { Request, Response, NextFunction } from 'express';

const catchAsyncErrors = (callback: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};

export default catchAsyncErrors;