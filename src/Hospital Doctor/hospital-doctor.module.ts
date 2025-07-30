import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalDoctorController } from './hospital-doctor.controller';
import { HospitalDoctorService } from './hospital-doctor.service';
import { HospitalDoctor, HospitalDoctorSchema } from './Schema/hospital-doctor.schema';
import { HospitalKyc, HospitalKycSchema } from 'src/Hospital Kyc/Schema/create-hospital-kyc-schema';
import { DoctorKycModule } from 'src/KYCDoctor/KycDoctor.module';
import { DoctorKycService } from 'src/KYCDoctor/KycDoctor.service';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HospitalDoctor.name, schema: HospitalDoctorSchema },
      { name: HospitalKyc.name, schema: HospitalKycSchema },
    ]),
    DoctorKycModule,
  ],
  controllers: [HospitalDoctorController],
  providers: [HospitalDoctorService ],
})
export class HospitalDoctorModule {}
