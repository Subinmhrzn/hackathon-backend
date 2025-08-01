import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class Appointment {
  @Prop({ type: Types.ObjectId, ref: 'User' }) patientId: Types.ObjectId;
  @Prop() doctorLicense: string;
  @Prop() hospitalLicense: string;
  @Prop() date: string;
  @Prop() timeSlot: string;
  @Prop({ default: 'pending' }) status: 'pending' | 'confirmed' | 'cancelled';
}