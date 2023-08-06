import { Exclude } from "class-transformer";

export class UserDto {

  id: number;
  email: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
  access_token?: string
  @Exclude()
  password:string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}