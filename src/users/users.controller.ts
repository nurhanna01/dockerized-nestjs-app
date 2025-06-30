import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  @Get()
  async getUsers(): Promise<any> {
    return this.service.findAll();
  }
  @Post()
  async saveUser(@Body() user: CreateUserDto): Promise<string> {
    await this.service.saveUser(user);
    return 'Ok';
  }
}
