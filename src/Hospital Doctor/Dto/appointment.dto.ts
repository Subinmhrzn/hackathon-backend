import { IsNotEmpty, IsString } from "class-validator";

export class BookAppointmentDto {
  @IsNotEmpty()
  @IsString()
  doctorLicenseNumber: string;

  @IsNotEmpty()
  @IsString()
  hospitalId: string;

  @IsNotEmpty()
  @IsString()
  date: string; // Ideally in 'YYYY-MM-DD' format

  @IsNotEmpty()
  @IsString()
  timeSlot: string; // e.g., '10:00'
}
