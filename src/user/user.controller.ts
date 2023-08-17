import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../models/user/create-user.dto';
import { User } from '../models/user/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }
}
