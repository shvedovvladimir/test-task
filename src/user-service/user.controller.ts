import { Controller, Get, Dependencies, Post, Body, UsePipes, Headers, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './Dto/userDto';
import { ValidationPipe } from 'src/common/validation.pipe';
import { IUser } from './interfaces/user.interface';
import { UserLoginDto } from './Dto/userLoginDto';
import { LoginResponse } from './interfaces/loginResponse.interface';
import { GetUsersResponse } from './interfaces/getUsersResponse';

@Controller('/user')
@Dependencies(UserService)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers(): Promise<GetUsersResponse> {
    const users = await this.userService.getAll();
    return {
      users,
    };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async createUser(@Body() user: UserDto): Promise<IUser> {
    return this.userService.create(user);
  }

  @Post('/login')
  public async login(@Body() userLoginInfo: UserLoginDto): Promise<LoginResponse> {
    return this.userService.login(userLoginInfo);
  }

  @Get('logout')
  @HttpCode(204)
  public async logout(@Headers() headers: any): Promise<boolean> {
    const result = await this.userService.logout(headers.authorization);

    return result;
  }
}
