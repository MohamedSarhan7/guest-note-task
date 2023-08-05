import { Router } from "express";

import authRouter from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
// router.use("notes", usersRouter);
// router.use("notes", usersRouter);
// 


export default router;