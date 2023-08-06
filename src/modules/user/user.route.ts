import { Router } from 'express';
import upload from '../../common/middlewares/multer.middleware';
import { updateUser, uploadUserImage ,getTimeLine} from './user.controller';
import isAuthentcated from "../../common/middlewares/is-authentcated.middleware"
import { PaginationParams } from '../../common/middlewares/pagination.middleware';
const userRouter = Router();

userRouter.post('/upload-profile', isAuthentcated, upload.single('image'), uploadUserImage);
userRouter.patch('/', isAuthentcated, updateUser);
userRouter.get('/timeline', isAuthentcated, PaginationParams, getTimeLine);


export default userRouter;