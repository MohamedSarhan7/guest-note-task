import { IsNumber,IsArray } from 'class-validator';

export class deleteReceivedNotesDto {
  @IsArray()
  @IsNumber({}, { each: true })
  notes_ids: number[];
  constructor(note: deleteReceivedNotesDto) {
    Object.assign(this, note);
  }

}