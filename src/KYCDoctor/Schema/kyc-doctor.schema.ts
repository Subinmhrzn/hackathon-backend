import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({collection : "KycDoctor"})
export class DoctorKyc{
    @Prop({type: Types.ObjectId, ref: 'User', required:true})
    userId: Types.ObjectId

    @Prop({required: 'true'}) fullName: string;
    @Prop({required: 'true'}) dob: string;
    @Prop({required: 'true'}) address: string;
    @Prop({required: 'true'}) phoneNumber: string;
    @Prop({required: 'true', unique: 'true'}) licenseNumber: string;
    @Prop({required: 'true'}) specialization: string;
    @Prop({required: 'true'}) experiencedYear: string;

    @Prop({required: 'true'}) licenseImageUrl: string;

    @Prop({ default: 'pending', enum: ['pending', 'isVerified', 'Rejected'] })
    status: string;

    @Prop() verifiedAt?: Date;
    @Prop() verifiedBy?: string;
 }

 export type DoctorKycDocument = DoctorKyc & Document;
 export const DoctorKycSchema = SchemaFactory.createForClass(DoctorKyc)