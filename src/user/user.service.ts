import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import {
  ALREADY_REGISTRED_ERROR,
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from './user.constants';
import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { isEmail, isPhoneNumber } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtServise: JwtService,
  ) {}

  async signUp(signUpDto: AuthDto): Promise<UserEntity> {
    const oldUser = await this.findUser(signUpDto.id);
    if (oldUser) {
      throw new BadRequestException(ALREADY_REGISTRED_ERROR);
    }
    const newUser = new UserEntity();
    const type = this.getTypeId(signUpDto.id);

    Object.assign(newUser, {
      user_id: signUpDto.id,
      password: signUpDto.password,
      type,
    });

    return this.userRepository.save(newUser);
  }

  async signIn(user_id: string): Promise<{ access_token: string }> {
    const payload = { user_id: user_id };
    return {
      access_token: await this.jwtServise.signAsync(payload),
    };
  }

  async findUser(id: string) {
    return this.userRepository.findOneBy({ user_id: id });
  }

  async validateUser(
    user_id: string,
    password: string,
  ): Promise<{ userId: string }> {
    const user = await this.findUser(user_id);
    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR);
    }
    const isCorrectPassword = await compare(password, user.password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return { userId: user.user_id };
  }

  // TODO: add enum for type
  private getTypeId(id: string): string {
    if (isEmail(id)) {
      return 'mail';
    }
    if (isPhoneNumber(id)) {
      return 'phone';
    }
    return '';
  }
}
