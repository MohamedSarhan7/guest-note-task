import { Router } from 'express';
import {isAuthentcated,upload} from "../../common/middlewares/index"
import { create } from './note.controller';

const noteRouter = Router();

noteRouter.post('/', isAuthentcated, upload.array('images'), create);




export default noteRouter;