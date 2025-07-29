import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HospitalKyc, HospitalKycSchema } from "src/Hospital Kyc/Schema/create-hospital-kyc-schema";
import { kyc, kycSchema } from "src/KYC patient/schema/Kyc.schema";
import { DoctorKyc, DoctorKycSchema } from "src/KYCDoctor/Schema/kyc-doctor.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {name: HospitalKyc.name, schema: HospitalKycSchema},
            {name: DoctorKyc.name, schema: DoctorKycSchema},
            {name: kyc.name, schema: kycSchema},
        ])
    ], controllers:[
        AdminController
    ],
    providers:[
        AdminService
    ]
})

export class AdminModule{}