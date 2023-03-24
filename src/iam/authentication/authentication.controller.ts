import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from './authentication.service';
import { Auth } from './decorators/auth.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthType } from './enums/auth-type.enum';

@ApiTags('Authentification')
@Auth(AuthType.None)
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  @ApiOperation({
    summary: 'sign up a new user',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'amardjebabla10',
          description: 'this is a username',
        },
        password: {
          type: 'integer',
          example: 'amar500Gdsfdsfdsfsd',
          description: 'this is a password',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'new user registrered...',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden You should be authenticated',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK) // by default @Post does 201, we wanted 200 - hence using @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'sign in ',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'amardjebabla10',
          description: 'this is a username',
        },
        password: {
          type: 'integer',
          example: 'amar500Gdsfdsfdsfsd',
          description: 'this is a password',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'new user registrered...',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden You should be authenticated',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }
}
