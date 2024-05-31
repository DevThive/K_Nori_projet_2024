import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { accessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { ApproveUserDto } from './dto/approve-user';

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

  //유저 승인처리
  @ApiBearerAuth('accessToken')
  @UseGuards(accessTokenGuard)
  @Patch('approve/:id')
  async approveUser(
    @Param('id') id: number,
    @UserId() userId: number,
    @Body() approveUserDto: ApproveUserDto,
  ) {
    return await this.userService.approveUser(id, userId, approveUserDto);
  }
}
