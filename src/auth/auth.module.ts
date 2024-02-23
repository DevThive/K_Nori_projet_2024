import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { accessTokenGuard } from './guard/access-token.guard';
import { accessTokenStrategy } from './strategy/access-token.strategy';
import { refreshTokenGuard } from './guard/refresh-token.guard';
import { refreshTokenStrategy } from './strategy/refresh-token.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule,

    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  exports: [
    accessTokenGuard,
    accessTokenStrategy,
    refreshTokenGuard,
    refreshTokenStrategy,
    JwtModule,
    PassportModule,
    AuthService,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    accessTokenGuard,
    accessTokenStrategy,
    refreshTokenGuard,
    refreshTokenStrategy,
  ],
})
export class AuthModule {}
