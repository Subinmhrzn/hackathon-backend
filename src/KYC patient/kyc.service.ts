import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { kyc, kycDocument } from "./schema/Kyc.schema";
import { Model } from "mongoose";
import { CreateKycDto } from "./schema/dto/create-kyc.dto";

@Injectable()

export class kycService{
    constructor(
        @InjectModel(kyc.name) private readonly kycModel: Model<kycDocument>
    ){}

    async create(userId: string,createKycDto:CreateKycDto): Promise<kyc>{

        const existingKyc = await this.kycModel.findOne({ userId: createKycDto.userId});

        if(existingKyc){
            throw new BadRequestException('Kyc already submitted for this user')
        }
        const userName = await this.kycModel.findOne({userName: createKycDto.userName})
        if(userName){
            throw new BadRequestException('UserName Already exists')
        }
        const createdKyc = new this.kycModel({
            ...createKycDto,
            userId
        })
        return createdKyc.save()
    }

}