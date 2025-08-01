import { IsNotEmpty } from "class-validator";


export class BookAppointmentDto {
    doctorLicense: string;
    hospitalLicense: string;
    date: string;
    timeSlot: string;
}

