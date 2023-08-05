import { Request } from "express";
export interface AuthRequest extends Request {
  user?: JwtPayload
}

export type JwtPayload = {
  email: string;
  id: number;
  iat?: number;
  exp?: number;
};