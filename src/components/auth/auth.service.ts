import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ where: { email: email } });
    if (!user) return null;
    const validPassword = await bcrypt.compare(pass, user.password);
    if (user && validPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(req: any) {
    const payload = {
      user: {
        id: req.user.id,
        email: req.user.email,
        username: req.user.username,
        created_at: req.user.created_at,
        updated_at: req.user.updated_at,
      },
    };
    return {
      user: payload.user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data) {
    data.password = await bcrypt.hash(data.password, 10);
    const response = await this.usersService.create(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token);
  }
}
