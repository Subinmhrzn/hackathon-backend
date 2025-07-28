import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

export enum UserRole{
    ADMIN='ADMIN',
    PATIENT='PATIENT',
    USER= 'USER',
    DOCTOR= 'DOCTOR',
    HOSPITAL='HOSPITAL'

}


@Schema()
export class User {

    @Prop({required: true})
    email: string
    @Prop({required: true})
    password: string
    @Prop({enum: UserRole, default: UserRole.USER})
    role: UserRole
}

export const UserSchema =  SchemaFactory.createForClass(User)