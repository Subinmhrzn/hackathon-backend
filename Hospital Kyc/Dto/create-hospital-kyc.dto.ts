import { IsNotEmpty } from 'class-validator';

export class CreateHospitalKycDto {
  @IsNotEmpty() userId: string;
  @IsNotEmpty() hospitalName: string;
  @IsNotEmpty() licenseNumber: string; 
  @IsNotEmpty() contactNumber: string;
  @IsNotEmpty() emergencyContact: string;
  @IsNotEmpty() address: string;
  @IsNotEmpty() licenseDocumentUrl: string;
  status?: string;
}
