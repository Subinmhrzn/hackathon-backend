import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: "HospitalKyc" })
export class HospitalKyc {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true }) hospitalName: string;
 
  @Prop({ required: true }) licenseNumber: string; 
  @Prop({ required: true }) contactNumber: string;
  @Prop({ required: true }) emergencyContact: string;
  @Prop({ required: true }) address: string;
  @Prop({ required: true }) licenseDocumentUrl: string;

  @Prop({ default: 'pending', enum: ['pending', 'isVerified', 'Rejected'] })
  status: string;

  @Prop() verifiedAt?: Date;
  @Prop() verifiedBy?: string;
}

export type HospitalKycDocument = HospitalKyc & Document;
export const HospitalKycSchema = SchemaFactory.createForClass(HospitalKyc);
