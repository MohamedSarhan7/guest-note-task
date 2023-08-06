import { Request, Response, NextFunction } from 'express';

export const catchAsyncErrors = (callback: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};
