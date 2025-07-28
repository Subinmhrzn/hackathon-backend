import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HospitalKycService } from './hospital-kyc-service';
import { HospitalKycController } from './hospital-kyc-controller';
import { HospitalKyc, HospitalKycSchema } from './Schema/create-hospital-kyc-schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HospitalKyc.name, schema: HospitalKycSchema }
    ])
  ],
  controllers: [HospitalKycController],
  providers: [HospitalKycService],
})
export class HospitalKycModule {}
