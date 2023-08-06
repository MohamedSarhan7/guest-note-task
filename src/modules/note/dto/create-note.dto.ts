import { IsString, IsNotEmpty,MinLength,IsNumber, IsArray } from 'class-validator'
export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;
  
  @IsNumber()
  // @IsPositive()
  type_id: number;
  
  // @MinLength(1,{ each:true})
  @IsArray()
  users_id: number[];

  constructor(note: CreateNoteDto) {
    Object.assign(this, note);
  }

}