import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Appointment } from "./Schema/appointment.schema";

// @Injectable()
// export class AppointmentService{
//     constructor{
//         @InjectModel(Appointment.name) private readonly
//     }
// }