import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/decorators/public.decorator';
import { AuthRefreshGuard } from './guards/authRefresh.guard';
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginAuth(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginAuth(loginAuthDto);
  }

  @UseGuards(AuthRefreshGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
