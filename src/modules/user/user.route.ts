import { Router } from 'express';
import  upload from '../../common/middlewares/multer.middleware';
import { updateUser, uploadUserImage } from './user.controller';
import isAuthentcated from "../../common/middlewares/is-authentcated.middleware"
const userRouter = Router();

userRouter.post('/upload-profile', isAuthentcated, upload.single('image'), uploadUserImage);
userRouter.patch('/', isAuthentcated,updateUser);


export default userRouter;