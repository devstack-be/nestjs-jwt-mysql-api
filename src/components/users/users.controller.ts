import {
  Controller,
  HttpStatus,
  Get,
  Post,
  Patch,
  Delete,
  Res,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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
      message: 'User has been created successfully!',
      user: newUser,
    });
  }

  @Get(':id')
  async getUser(@Res() res, @Param('id') userId) {
    const user = await this.userService.findOne({ where: { id: userId } });
    return res.status(HttpStatus.OK).json(user);
  }

  @Delete(':id')
  async deleteUser(@Res() res, @Param('id') userId) {
    await this.userService.remove(userId);
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted successfully!',
    });
  }

  @Patch(':id')
  async editUser(
    @Res() res,
    @Param('id') userId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.edit(userId, updateUserDto);
    return res.status(HttpStatus.OK).json({
      message: 'User has been updated successfully!',
    });
  }

  @Post('/avatar/:id')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
