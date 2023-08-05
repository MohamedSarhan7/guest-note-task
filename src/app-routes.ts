import { Router } from "express";

import authRouter from "./modules/auth/auth.route";
import userRouter from "./modules/user/user.route";
import noteRouter from "./modules/note/note.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/notes", noteRouter);
// router.use("notes", usersRouter);
// 


export default router;