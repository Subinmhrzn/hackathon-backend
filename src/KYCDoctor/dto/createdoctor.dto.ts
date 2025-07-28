import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDoctorKycDto {
  @IsString() @IsNotEmpty() fullName: string;
  @IsString() @IsNotEmpty() dob: string;
  @IsString() @IsNotEmpty() address: string;
  @IsString() @IsNotEmpty() phoneNumber: string;

  @IsString() @IsNotEmpty() licenseNumber: string;
  @IsString() @IsNotEmpty() specialization: string;
  @IsString() @IsNotEmpty() experiencedYear: string;
  @IsString() @IsNotEmpty() licenseImageUrl: string;

  @IsOptional() status?: string;
  @IsOptional() verifiedAt?: Date;
  @IsOptional() verifiedBy?: string;
}
