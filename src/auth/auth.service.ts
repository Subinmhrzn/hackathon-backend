import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/schemas/user/user.service";
import * as bcrypt from 'bcrypt';
import { UserDocument, UserRole } from "src/schemas/user.schema";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService
  ) {}

  // Make sure this returns the UserDocument or null explicitly
  async validateUser(email: string, password: string): Promise<UserDocument | null> {
    const user = await this.userService.findByEmail(email) as UserDocument;
    if (!user) {
      return null;
    }

    // Fix: use bcrypt.compare to check password, not assignment (=)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async signup(email: string, password: string, role: UserRole) {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userService.create({ email, password: hashed, role }) as UserDocument;

    return { message: 'User created successfully', userId: user._id };
  }

  async signin(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
