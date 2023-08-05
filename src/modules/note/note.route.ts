import { Router } from 'express';
import upload from "../../common/middlewares/multer.middleware";
import isAuthentcated from "../../common/middlewares/is-authentcated.middleware"

const noteRouter = Router();

import { create } from './note.controller';
noteRouter.post('/', isAuthentcated, upload.any(), create);




export default noteRouter;