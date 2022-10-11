import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { CustomValidId } from './customValidId';

export class AuthDto {
  @IsNotEmpty()
  @Validate(CustomValidId, {
    message: 'Not Valid Id',
  })
  id: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
