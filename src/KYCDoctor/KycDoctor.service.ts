import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { DoctorKyc, DoctorKycDocument } from "./Schema/kyc-doctor.schema";
import { Model } from "mongoose";
import { CreateDoctorKycDto } from "./dto/createdoctor.dto";


@Injectable()
export class DoctorKycService {
    constructor(
        @InjectModel(DoctorKyc.name) private readonly doctorkycMode: Model<DoctorKycDocument>
    ) { }

    async create(userId: string, createDoctorKycDto: CreateDoctorKycDto): Promise<DoctorKyc> {
        const existingDoctor = await this.doctorkycMode.findOne({
            licenseNumber: createDoctorKycDto.licenseNumber,
        });

        if (existingDoctor) {
            throw new BadRequestException("This Doctor License number has already been registered");
        }

        const doc = new this.doctorkycMode({
            ...createDoctorKycDto,
            userId
        })
        return doc.save()
    }

    async findByLicenseNumber(licenseNumber: string): Promise<DoctorKyc> {
        const doctor = await this.doctorkycMode.findOne({ licenseNumber }).populate('userId');
        if (!doctor) {
            throw new NotFoundException('Doctor with this license is not available')
        }
        return doctor;
    }
    async isDoctorVerified(licenseNumber: string): Promise<boolean> {
    const kyc = await this.doctorkycMode.findOne({ licenseNumber, status: 'isVerified' });
    console.log({kyc})
    return !!kyc;
  }
}