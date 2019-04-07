import { Controller, Get, Dependencies, Post, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './Dto/userDto';
import { ValidationPipe } from 'src/common/validation.pipe';
import { IUser } from './interfaces/user.interface';

@Controller('/user')
@Dependencies(UserService)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers(): Promise<IUser[]> {
    return this.userService.getAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async createUser(@Body() user: UserDto): Promise<IUser> {
    return this.userService.create(user);
  }
}
