import { Controller, Get, Dependencies } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user';

@Controller()
@Dependencies(UserService)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getUsers(): Promise<any[]> {
    return this.userService.getAll();
  }
}
