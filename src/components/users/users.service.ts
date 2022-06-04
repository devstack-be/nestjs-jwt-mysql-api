import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users as User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['books'] });
  }

  async findOne(data: number | any): Promise<User | undefined> {
    return await this.usersRepository.findOne(data);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return this.usersRepository.save(createUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async edit(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    console.log(updateUserDto)
    await this.usersRepository.update(id, updateUserDto);
  }

  async editAvatar(id: string, fileName: string): Promise<void> {
    await this.usersRepository.update(id, {
      avatar: fileName,
    });
  }
}
