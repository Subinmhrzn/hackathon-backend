import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { kycService } from "./kyc.service";
import { CreateKycDto } from "./schema/dto/create-kyc.dto";
import { kyc } from "./schema/Kyc.schema";
import { JwtAuthGuard } from "src/auth/auth.gaurd";

@Controller('patient-kyc')
export class kycController {
    constructor(
        private readonly KycService: kycService
    ){}

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async create(@Req() req ,@Body() createKycDto: CreateKycDto): Promise<kyc>{
        const loggedInUser = req.user as any
        const userId = loggedInUser.userId
        return this.KycService.create(userId,createKycDto);
    }
}