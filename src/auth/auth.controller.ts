import { Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/localAuth.guard';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login() {}
}
