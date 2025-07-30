import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { HospitalDoctor, HospitalDoctorDocument } from './Schema/hospital-doctor.schema';
import { HospitalKyc, HospitalKycDocument } from 'src/Hospital Kyc/Schema/create-hospital-kyc-schema';


@Injectable()
export class HospitalDoctorService {
  constructor(
    @InjectModel(HospitalDoctor.name)
    private doctorModel: Model<HospitalDoctorDocument>,
    @InjectModel(HospitalKyc.name)
    private hospitalKycModel: Model<HospitalKycDocument>
  ) {}

  async isHospitalVerified(hospitalId: string): Promise<boolean> {
    const kyc = await this.hospitalKycModel.findOne({ userId: hospitalId, status: 'isVerified' });
    console.log({kyc})
    return !!kyc;
  }

  

  async addDoctor(hospitalId: string, licenseNumber: string) {
    const exists = await this.doctorModel.findOne({ hospitalId, doctorLicenseNumber: licenseNumber });
    
    if (exists) {
      throw new BadRequestException('Doctor already registered in this hospital.');
    }

    const newDoctor = new this.doctorModel({ hospitalId, doctorLicenseNumber: licenseNumber });
    return newDoctor.save();
  }

  async removeDoctor(hospitalId: string, licenseNumber: string) {
    const removed = await this.doctorModel.findOneAndDelete({
      hospitalId,
      doctorLicenseNumber: licenseNumber,
    });

    if (!removed) {
      throw new BadRequestException('Doctor not found in this hospital.');
    }

    return { message: 'Doctor removed successfully' };
  }
}
