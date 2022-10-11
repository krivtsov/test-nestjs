import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signUp(@Body() signUpDto: AuthDto): Promise<{ access_token: string }> {
    const user = await this.userService.signUp(signUpDto);
    return this.userService.signIn(user.user_id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signin')
  async signIn(
    @Body() { id: user_id, password }: AuthDto,
  ): Promise<{ access_token: string }> {
    const { userId } = await this.userService.validateUser(user_id, password);
    return this.userService.signIn(userId);
  }
}
