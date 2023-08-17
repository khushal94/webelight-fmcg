import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { User } from '../models/user/user.entity';
import { CreateUserDto } from '../models/user/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    // private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // const user = this.userRepository.create(createUserDto);
    return null;
  }

  async findOneByUsername(username: string): Promise<User | undefined> {
    return null;
  }
}