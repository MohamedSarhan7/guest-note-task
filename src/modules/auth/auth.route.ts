import { Router } from 'express';
// import { LoginDto } from "./dto/login.dto";
// import { plainToClass, Expose } from "class-transformer";
// import createExeption from 'http-errors';
// import { validate, ValidationError } from "class-validator";
const authRouter = Router();

import { login ,register} from './auth.controller';
authRouter.post('/login',login);


authRouter.post('/register', register);

export default authRouter;