import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fcmToken: string

  constructor(partial: UpdateUserDto) {
    Object.assign(this, partial);
  }
}