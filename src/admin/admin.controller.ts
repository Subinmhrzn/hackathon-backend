import { Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/auth.gaurd";
import {RolesGuard } from "src/auth/role.gaurd";
import { AdminService } from "./admin.service";
import { Roles } from "src/auth/roles.decorator";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService : AdminService) { }

    @Get('hospitals')
    gethospitals() {
        return this.adminService.getPendingHospitals();
    }
    
    @Patch('hospitals/:id/verify')
    
    verifyHospital(@Param('id') id: string) {
        return this.adminService.verifyHospital(id);
        
    }

    @Patch('hospitals/:id/reject')
    rejectHospital(@Param('id') id: string) {
        return this.adminService.rejectHospital(id);
    }

    @Get('doctors')
    getDoctors() {
        return this.adminService.getPendingDoctors();
    }

    @Patch('doctors/:licenseNumber/verify')
    verifyDoctprs(@Param('licenseNumber') licenseNumber: string) {
        console.log(licenseNumber)
        return this.adminService.verifyDoctor(licenseNumber);
    }

    @Patch('doctors/:id/reject')
    rejectDoctors(@Param('id') id: string) {
        return this.adminService.rejectDoctor(id);
    }

    @Get('patient')
    getPatients() {
        return this.adminService.getPendingPatients();
    }

    @Patch('patients/:id/verify')
    verifyPatients(@Param('id') id: string) {
        return this.adminService.verifyPatient(id);
    }

    @Patch('patient/:id/reject')
    rejectPatients(@Param('id') id: string) {
        return this.adminService.rejectPatient(id);
    }

}