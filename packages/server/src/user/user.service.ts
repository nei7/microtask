import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './create-user.input';
import { UserEntity } from './user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(UserEntity)
      private userRepository: Repository<UserEntity>,
   ) {}

   findById(_id: string) {
      return this.userRepository.findOne(_id);
   }

   findByUsername(username: string) {
      return this.userRepository.findOne({ username });
   }

   async create(createUserInput: CreateUserInput) {
      const { username, email, password } = createUserInput;

      const user = this.userRepository.create({
         username,
         email,
         password: await argon2.hash(password),
      });

      return await this.userRepository.save(user);
   }
}
