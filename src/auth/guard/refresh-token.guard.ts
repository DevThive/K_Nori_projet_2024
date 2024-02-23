import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class refreshTokenGuard extends AuthGuard('refreshToken') {}
