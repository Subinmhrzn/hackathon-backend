import { IsIn, IsOptional, IsString } from "class-validator";

export class VerifyKyc{
    @IsIn(['VERIFIED', "REJECTED"])
    status:'verifed' | 'rejected';

    @IsOptional()
    @IsString()

    verfiedBy? : string

}