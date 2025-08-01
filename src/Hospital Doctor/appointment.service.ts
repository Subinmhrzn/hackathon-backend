import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment } from "./Schema/appointment.schema";
import { Model } from "mongoose";
import { HospitalDoctor } from "./Schema/hospital-doctor.schema";
import { BookAppointmentDto } from "./Dto/appointment.dto";
import { NotFoundError } from "rxjs";

@Injectable()
export class AppointmentService{
    constructor(
        @InjectModel(Appointment.name) private readonly appointmentModel : Model<Appointment>,
        @InjectModel(HospitalDoctor.name) private readonly hospitalDoctorMode : Model<HospitalDoctor>
    ){}
    
    async bookAppointmet(patientId:string, dto: BookAppointmentDto){
        const{doctorLicenseNumber,hospitalId,date,timeSlot}= dto;

        const record = await this.hospitalDoctorMode.findOne({doctorLicenseNumber,hospitalId});
        if(!record) throw new NotFoundException('Doctor not found in the hosital');

        const day = new Date(date).toLocaleDateString('en-us', {weekday:'long'})
        const slot = record.availability.find((a)=> a.day=== day && timeSlot >=a.from&&  timeSlot>=a.to);
        if(!slot) throw new BadRequestException('time slot unavailabe');
    }
}