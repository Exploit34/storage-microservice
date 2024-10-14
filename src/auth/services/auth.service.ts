import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUser } from '../../middleware/jwt/jwt.validation';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(ValidateUser) private readonly validateUserPipe: ValidateUser,
  ) {}

  async login(value: { username: string; password: string }) {

    const user = this.validateUserPipe.transform(value, null);

    if (user) {
      const payload = { username: user.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
