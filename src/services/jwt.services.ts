import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CustomJwtService {
  constructor(private jwtService: JwtService) {}

  generateAccessToken({ email, name }) {
    const accessTokenPayload = { email, name };
    const accessToken = this.jwtService.sign(accessTokenPayload, {
      expiresIn: '5m',
    });

    return accessToken;
  }

  generateRefreshToken({ email, name }) {
    const refreshTokenPayload = { email, name };
    const refreshToken = this.jwtService.sign(refreshTokenPayload, {
      expiresIn: '30d',
      secret: `${process.env.JWT_REFRESH_SECRET}`,
    });

    return refreshToken;
  }

  validateAccessToken(token: string): JwtPayload | null {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
    } catch {
      return null;
    }
  }

  validateRefreshToken(token: string): JwtPayload | null {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      return null;
    }
  }
}
