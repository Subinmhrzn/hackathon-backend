import { Body, Controller, ForbiddenException, Get, Param, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { DoctorKycService } from "./KycDoctor.service";
import { DoctorKyc } from "./Schema/kyc-doctor.schema";
import { CreateDoctorKycDto } from "./dto/createdoctor.dto";
import { JwtAuthGuard } from "src/auth/auth.gaurd";

@Controller('doctor-kyc')
export class DoctorKycController {
  constructor(private readonly doctorKycService: DoctorKycService) { }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() dto: CreateDoctorKycDto): Promise<DoctorKyc> {
    const loggedInUser = req.user as any;

    const userId = loggedInUser.userId;

    

    return this.doctorKycService.create(userId, dto);
  }

  @Get('license/:licenseNumber')
  async getDoctorByLicense(@Param('licenseNumber') licenseNumber: string) {
    return this.doctorKycService.findByLicenseNumber(licenseNumber)
  }
}