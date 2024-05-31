import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';

@ApiTags('로그인&회원가입')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Get('userlist')
  async userlist(@UserId() userId: number) {
    return await this.userService.userlist(userId);
  }
}
