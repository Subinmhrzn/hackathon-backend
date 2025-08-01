import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NotFoundError } from "rxjs";
import { HospitalKyc } from "src/Hospital Kyc/Schema/create-hospital-kyc-schema";
import { kyc } from "src/KYC patient/schema/Kyc.schema";
import { DoctorKyc } from "src/KYCDoctor/Schema/kyc-doctor.schema";


@Injectable()
export class AdminService{
    constructor(
        @InjectModel(HospitalKyc.name) private readonly hospitalModel: Model<HospitalKyc>,
        @InjectModel(kyc.name) private readonly kycModel: Model <kyc>,
        @InjectModel(DoctorKyc.name) private readonly doctorModel: Model<DoctorKyc>,

    ){}

    async getPendingHospitals (){
        return this.hospitalModel.find({status: "pending"});
    }

    
  async verifyHospital(id: string) {
    return this.hospitalModel.findByIdAndUpdate(id, {
      status: 'isVerified',
      verifiedAt: new Date(),
      verifiedBy: 'ADMIN',
    }, { new: true });
  }

  async rejectHospital(id: string) {
    return this.hospitalModel.findByIdAndUpdate(id, {
      status: 'isRejected',
      verifiedBy: 'ADMIN',
    }, { new: true });
  }

  async getPendingDoctors() {
    return this.doctorModel.find({ status: 'pending' });
  }

  async verifyDoctor(licenseNumber: string) {
    const doctor =await this.doctorModel.findOne({licenseNumber})
    if(!doctor) throw new NotFoundException('doctor not found');
    doctor.status = 'isVerified';
    doctor.verifiedAt = new Date();
    doctor.verifiedBy = "admin";
    return doctor.save()
  }
  async rejectDoctor(id: string){
    return this.doctorModel.findByIdAndUpdate(id,{
        status:"isRejected",
        verifiedBy:"ADMIN",
        verifiedAt: new Date()
    }, {new: true})
  }

  async getPendingPatients() {
    return this.kycModel.find();
  }

  async verifyPatient(id: string) {
    return this.kycModel.findByIdAndUpdate(id, 
      { status: "isVerified",
        verifiedAt:new Date(),
        verifiedBy:"ADMIN"
       }, { new: true });
  }

  async rejectPatient(id: string){
    return this.kycModel.findByIdAndUpdate(id,{
      status:"isRejected",
      verifiedAt: new Date(),
      verifiedBy:"ADMIN"
    })
  }
}
