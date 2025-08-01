import {
  Controller,
  Post,
  Delete,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
  Get,
  Param,
} from '@nestjs/common';

import { HospitalDoctorService } from './hospital-doctor.service';
import { Request } from 'express';
import { HospitalRolesGuard } from 'src/auth/role.gaurd';
import { JwtAuthGuard } from 'src/auth/auth.gaurd';
import { AddDoctorDto } from './Dto/add-doctor.dto';
import { DoctorKycService } from 'src/KYCDoctor/KycDoctor.service';

@Controller('hospital-doctor')
@UseGuards(JwtAuthGuard, HospitalRolesGuard)
export class HospitalDoctorController {
  constructor(
    private readonly service: HospitalDoctorService,
    private readonly docservice: DoctorKycService
  ) { }

  @Post('add')
  async addDoctor(@Req() req: Request, @Body() dto: AddDoctorDto) {
    const user = req.user as any;

    if (user.role?.toUpperCase() !== 'HOSPITAL') {
      throw new ForbiddenException('Only hospitals can perform this action.');
    }

    console.log({ user })
    const isVerified = await this.service.isHospitalVerified(user.userId);
    console.log({ isVerified })
    if (!isVerified) {
      throw new ForbiddenException('Hospital is not verified.');
    }

    const docisVerified = await this.docservice.isDoctorVerified(dto.doctorLicenseNumber)
    if (!docisVerified) {
      throw new ForbiddenException('Doctor is not verified');
    }

    return this.service.addDoctor(user.userId, dto.doctorLicenseNumber,dto.availability[]);
  }

  @Delete('remove')
  async removeDoctor(@Req() req: Request, @Body() dto: AddDoctorDto) {
    const user = req.user as any;

    if (user.role?.toUpperCase() !== 'HOSPITAL') {
      throw new ForbiddenException('Only hospitals can perform this action.');
    }

    const isVerified = await this.service.isHospitalVerified(user._id);
    if (!isVerified) {
      throw new ForbiddenException('Hospital is not verified.');
    }

    return this.service.removeDoctor(user._id, dto.doctorLicenseNumber);
  }
  @Get(':hospitalLicense/doctors/:doctorLicense/availability')
  getAvailability(
    @Param('hospitalLicense') hospitalLicense: string,
    @Param('doctorLicense') doctorLicense: string,
  ) {
    return this.service.getDoctorAvailability(hospitalLicense, doctorLicense);
  }

  @Get(':hospitalLicense/doctors')
  getDoctorsByHospital(@Param('hospitalLicense') hospitalLicense: string) {
    return this.service.getDoctorsByHospital(hospitalLicense);
  }


}
