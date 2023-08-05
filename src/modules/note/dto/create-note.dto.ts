import { IsString, IsNotEmpty, IsPositive, IsArray, IsNumber } from 'class-validator'
export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;
  
  @IsNumber()
  @IsPositive()
  type_id: number;
  
  @IsNumber({},{ each:true})
  users_id: number[];

  constructor(note: CreateNoteDto) {
    Object.assign(this, note);
  }

}