import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateHospitalKycDto } from './Dto/create-hospital-kyc.dto';
import { HospitalKyc, HospitalKycDocument } from './Schema/create-hospital-kyc-schema';

@Injectable()
export class HospitalKycService {
  constructor(
    @InjectModel(HospitalKyc.name) private hospitalKycModel: Model<HospitalKycDocument>,
  ) {}

  async create(dto: CreateHospitalKycDto): Promise<HospitalKyc> {
    const existing = await this.hospitalKycModel.findOne({
      licenseNumber: dto.licenseNumber,
    });

    if (existing) {
      throw new BadRequestException('License number already exists.');
    }

    const newKyc = new this.hospitalKycModel(dto);
    return newKyc.save();
  }
}
