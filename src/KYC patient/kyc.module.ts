import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { kyc, kycSchema } from "./schema/Kyc.schema";
import { kycController } from "./Kyc.controller";
import { kycService } from "./kyc.service";

@Module({
    imports:[
        MongooseModule.forFeature([{
            name: kyc.name,
            schema: kycSchema
        }])
    ],
    controllers:[kycController],
    providers:[kycService]
})

export class kycModule{}