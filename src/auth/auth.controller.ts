import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() body:any){
        console.log('signup bpdy:',body);
        
        return this.authService.signup(body.email, body.password, body.role)
    }
    @Post('signin')
    @Post('signin')
  async signin(@Body() credentials: { email: string; password: string }) {
    return this.authService.signin(credentials.email, credentials.password);
  }



}
