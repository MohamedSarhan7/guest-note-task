import { Router } from "express";
import { Request, Response } from "express";
const router = Router();
router.use("", (req:Request, res:Response) => {
  return res.json({"test": true});

});

export default router;