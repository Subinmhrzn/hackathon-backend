import { IsNotEmpty } from "class-validator";

export class AddDoctorDto{
    @IsNotEmpty()
    doctorLicenseNumber: string;
}