import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateKycDto {
  @IsNotEmpty() userId: Types.ObjectId;

  @IsString() @IsNotEmpty() fullName: string;
  @IsString() @IsNotEmpty() userName: string;
  @IsString() @IsNotEmpty() dob: string;
  @IsString() @IsNotEmpty() address: string;
  @IsString() @IsNotEmpty() phoneNumber: string;
  @IsString() @IsNotEmpty() emergencyContact: string;
  @IsString() @IsNotEmpty() bloodGroup: string;
  @IsString() @IsNotEmpty() documentType: string;
  @IsString() @IsNotEmpty() documentNumber: string;
  @IsString() @IsNotEmpty() documentImageUrl: string;

  @IsOptional() status?: string;
  @IsOptional() verifiedAt?: Date;
  @IsOptional() verifiedBy?: string;
}
