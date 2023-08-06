import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import createExeption from "http-errors";
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

import appRoutes from "./app-routes";
import { errorHandler, insertNoteTypesIfNotExists } from "./common/utils/index";
const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(morgan("common"))

app.use("/api/v1/", appRoutes)

// 404 routes
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(createExeption(404, `${req.originalUrl} not found`));
});
// error handler
app.use(errorHandler);

app.listen(process.env.PORT || 3000, async () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`)
  
  // insert note types
  await insertNoteTypesIfNotExists()
})