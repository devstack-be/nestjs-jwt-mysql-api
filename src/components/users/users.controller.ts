import {
  Controller,
  HttpStatus,
  Get,
  Res,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(@Res() res) {
    const users = await this.userService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Post()
  async addUser(@Res() res, @Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User has been submitted successfully!',
      user: newUser,
    });
  }

  @Get(':id')
  async getUser(@Res() res, @Param('id') userId) {
    const user = await this.userService.findOne({ where: { id: userId } });
    return res.status(HttpStatus.OK).json(user);
  }
}
