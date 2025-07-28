import { IsEnum, IsString } from "class-validator";
import { UserRole } from "../user.schema";

export class createuserdto{
    user_id: number;
    fullName: string;
    @IsString()
    email: string;
    @IsString()
    password: string;

    @IsEnum(UserRole)
    role? : UserRole;
}