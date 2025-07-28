import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({collection: "PatientKyc"})
export class kyc{
    @Prop({type: Types.ObjectId, ref :'User', required:"true"})
    userId: Types.ObjectId;

    @Prop({required:"true"}) fullName:string
    @Prop({unique:"true", required: "true"}) userName: string
    @Prop({required:"true"}) dob:string
    @Prop({required:"true"}) address:string
    @Prop({required:"true"}) phoneNumber:string
    @Prop({required:"true"}) emergencyContact:string    
    @Prop({required:"true"}) bloodGroup:string
    @Prop({required:"true"}) documentType: string
    @Prop({required:"true"}) documentNumber:string
    @Prop({required:"true"}) documentImageUrl:string


    @Prop({default:'pending', enum: ['pending','isVerified','Rejected']})
    status: string

    @Prop() verifiedAt?: Date;

    @Prop() verifiedBy? : string;

}

export type kycDocument = kyc & Document;
export const kycSchema = SchemaFactory.createForClass(kyc)
