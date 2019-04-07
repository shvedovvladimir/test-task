import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';
import { UserDto } from './Dto/userDto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
    private readonly userRepository: Repository<User>;

    constructor(@InjectRepository(User) userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    public async getAll(): Promise<IUser[]> {
        return await this.userRepository
            .createQueryBuilder('test_task_user')
            .select('"id"')
            .addSelect('"login"')
            .addSelect('"createTime"')
            .addSelect('"updateTime"')
            .addSelect('"deleteTime"')
            .getRawMany();
    }

    public async create(userDto: UserDto): Promise<IUser> {
        const user = new User();
        Object.assign(user, userDto);
        const resp = await this.userRepository.save(user);
        delete resp.password;

        return resp as IUser;
    }
}
