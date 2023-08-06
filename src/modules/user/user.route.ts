import { Router } from 'express';
import { updateUser, uploadUserImage ,getTimeLine,deleteReceivedNotes} from './user.controller';
import { isAuthentcated, upload, PaginationParams } from "../../common/middlewares/index"

const userRouter = Router();

userRouter.post('/upload-profile', isAuthentcated, upload.single('image'), uploadUserImage);
userRouter.patch('/', isAuthentcated, updateUser);
userRouter.get('/timeline', isAuthentcated, PaginationParams, getTimeLine);
userRouter.delete('/received-notes', isAuthentcated, deleteReceivedNotes);


export default userRouter;