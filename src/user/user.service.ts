import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async signUp(signUpDto: AuthDto): Promise<any> {
    const newUser = new UserEntity();
    Object.assign(newUser, signUpDto);
    return await this.userRepository.save(newUser);
  }

  async signIn(): Promise<any> {}
}
