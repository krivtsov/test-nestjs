import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { CustomValidId } from './customValidId';

export class AuthDto {
  @IsNotEmpty()
  @Validate(CustomValidId, {
    message: 'Not Valid Id',
  })
  @ApiProperty({ example: 'email@mail.ru', description: 'Email or Phone' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'strongPass123', description: 'user password' })
  password: string;
}
