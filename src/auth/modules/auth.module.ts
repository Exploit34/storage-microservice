import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ValidateUser } from '../../middleware/jwt/jwt.validation';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, ValidateUser],
  exports: [AuthService],
})
export class AuthModule {}
