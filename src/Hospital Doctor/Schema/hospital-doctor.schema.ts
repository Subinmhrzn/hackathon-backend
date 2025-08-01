import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: "Hospital Doctor" })
export class HospitalDoctor {
    @Prop({ type: Types.ObjectId, ref: 'user', required: true })
    hospitalId: Types.ObjectId

    @Prop({ required: true })
    doctorLicenseNumber: string;

    @Prop([
        {
            day: String,
            from: String,
            to: String,
        },
    ])
    availability: { day: string; from: string; to: string }[];
    
    @Prop({ default: Date.now })
    addedAt: Date;
}

    

export type HospitalDoctorDocument = HospitalDoctor & Document;
export const HospitalDoctorSchema = SchemaFactory.createForClass(HospitalDoctor)
