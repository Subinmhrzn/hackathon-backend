import { Body, Controller, Post } from '@nestjs/common';
import { CreateHospitalKycDto } from './Dto/create-hospital-kyc.dto';
import { HospitalKycService } from './hospital-kyc-service';


@Controller('hospital-kyc')
export class HospitalKycController {
  constructor(private readonly hospitalKycService: HospitalKycService) {}

  @Post('create')
  async create(@Body() dto: CreateHospitalKycDto) {
    return this.hospitalKycService.create(dto);
  }
}
