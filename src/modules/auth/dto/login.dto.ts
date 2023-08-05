import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20)
  password: string;
  
  constructor(user: LoginDto) {
    Object.assign(this, user);
  }
}