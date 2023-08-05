import { JwtPayload } from "../../common/types/auth-request.types";
import { CreateNoteDto } from "./dto/index";

export const createNote = async (note: CreateNoteDto, files:any,user:JwtPayload)=>{
  console.log(note)
  console.log(files)
  console.log(user)
  
}