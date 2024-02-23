import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('로그인&회원가입')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
}
