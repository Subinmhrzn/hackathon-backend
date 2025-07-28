import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { DoctorKyc, DoctorKycSchema } from "./Schema/kyc-doctor.schema";
import { DoctorKycController } from "./kycDoctorController";
import { DoctorKycService } from "./KycDoctor.service";

@Module(
    {
        imports:[
            MongooseModule.forFeature([{
                name: DoctorKyc.name,
                schema: DoctorKycSchema
            }])
        ],
        controllers:[DoctorKycController],
        providers:[DoctorKycService],
    }
)
export class DoctorKycModule{}