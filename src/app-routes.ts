import { Router } from "express";
import { Request, Response } from "express";
import authRouter from "./modules/auth/auth.route";
const router = Router();
// router.use("users", usersRouter);
// router.use("notes", usersRouter);
// router.use("notes", usersRouter);
// 
router.use("/auth", authRouter);


export default router;