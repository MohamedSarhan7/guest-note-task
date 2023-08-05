import {IsEmail,IsNotEmpty,IsString,Length} from "class-validator"
export class  RegisterDto  { 
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name:string

  @IsString()
  @Length(8, 20)
  password: string;
  
  constructor(user: RegisterDto) {
    Object.assign(this, user);
  }
}