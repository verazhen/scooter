import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { User } from './user.entity';
// import { bcryptAsync } from '../util/util';
// import * as CryptoJS from 'crypto-js';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
const password = 'random_password';

// const salt = "123";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signUp(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, saltOrRounds);
    const newUser = await this.userRepository.save(user);
    return newUser;
  }

  async signIn(user: User): Promise<boolean | number> {
    const [userCheck] = await this.userRepository.find({
      where: [
        {
          email: user.email,
        },
      ],
    });

    if (!userCheck) return false;
    const isMatch = await bcrypt.compare(user.password, userCheck.password);
    if (!isMatch) return false;

    return userCheck.id;
  }

  async getUser(id: number): Promise<boolean | User> {
    const [userCheck] = await this.userRepository.find({
      where: [{ id: id }],
      relations: ['role'],
    });

    if (!userCheck) return false;
    console.log(userCheck);

    return userCheck;
  }
}
