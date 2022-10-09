import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @UsePipes(new ValidationPipe())
  @Post('signup')
  async signUp(@Body() signUpDto: AuthDto): Promise<any> {
    console.log('signUpDto :>> ', signUpDto);
    return this.userService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(): Promise<AuthDto> {
    return this.userService.signIn();
  }
}
