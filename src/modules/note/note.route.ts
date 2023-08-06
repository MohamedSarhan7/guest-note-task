import { Router } from 'express';
import upload from "../../common/middlewares/multer.middleware";
import isAuthentcated from "../../common/middlewares/is-authentcated.middleware"

const noteRouter = Router();

import { create } from './note.controller';
noteRouter.post('/', isAuthentcated, upload.array('images'), create);




export default noteRouter;