import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'
export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  fcmToken: string
  
  @IsOptional()
  @IsBoolean()
  receive_daily_notifi:boolean

  constructor(partial: UpdateUserDto) {
    Object.assign(this, partial);
  }
}