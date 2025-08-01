import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";

class TimeSlotDto {
  @IsString()
  day: string; 

  @IsString()
  from: string;

  @IsString()
  to: string;
}


export class AddDoctorDto{
    @IsNotEmpty()
    doctorLicenseNumber: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(()=>TimeSlotDto)
    availability: TimeSlotDto
}