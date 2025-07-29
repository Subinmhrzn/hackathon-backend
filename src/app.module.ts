import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './schemas/user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { kycModule } from './KYC patient/kyc.module';
import { DoctorKycModule } from './KYCDoctor/KycDoctor.module';
import { ConfigModule } from '@nestjs/config';
import { HospitalKycModule } from 'src/Hospital Kyc/hospital-kyc-module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [AuthModule, UserModule, BookmarkModule, kycModule, DoctorKycModule,HospitalKycModule,AdminModule ,ConfigModule.forRoot({isGlobal: true})],
 
})
export class AppModule {}
