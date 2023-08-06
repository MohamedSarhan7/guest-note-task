import { Response, NextFunction } from "express"
import { AuthRequest } from '../types/auth-request.types';

export const PaginationParams = (req, res: Response, next: NextFunction) => {
  const { page, pageSize } = req.query;

  req.query.page = parseInt(page) || 1;
  req.query.pageSize = parseInt(pageSize) <= 10 ? parseInt(pageSize) : 5;
  req.body.take = req.query.pageSize
  req.body.skip = req.query.page
  next();
}