import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { UserService } from './user.service';

class Response {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ',
    description: 'token',
  })
  access_token: string;
}

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 201, type: Response })
  async signUp(@Body() signUpDto: AuthDto): Promise<Response> {
    const user = await this.userService.signUp(signUpDto);
    return this.userService.signIn(user.user_id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('signin')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: Response })
  async signIn(@Body() { id: user_id, password }: AuthDto): Promise<Response> {
    const { userId } = await this.userService.validateUser(user_id, password);
    return this.userService.signIn(userId);
  }
}
