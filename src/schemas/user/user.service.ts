import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument, UserRole } from "../user.schema";
import { Model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email });
    }

    async create(user: Partial<User>): Promise<User> {
        try {
            if (!user.role) {
                user.role =  UserRole.USER;
            }
            if (!user['user_id']) {
                user['user_id'] = uuidv4();
            }
            console.log('Creating user with role:', user.role);

            return this.userModel.create(user)

        } catch (error) {
            console.error('error creating user', error)
            throw (error)
        }

    }
}