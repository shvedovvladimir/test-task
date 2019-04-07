import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';
import { UserDto } from './Dto/userDto';
import { IUser } from './interfaces/user.interface';
import { UserLoginDto } from './Dto/userLoginDto';
import * as bcrypt from 'bcrypt-nodejs';

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

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;

        try {
            const resp = await this.userRepository.save(user);
            delete resp.password;

            return resp as IUser;
        } catch (error) {
            throw new HttpException(`save error: ${error.detail}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async login(userLoginInfo: UserLoginDto): Promise<any> {
        const user = await this.userRepository.findOne({login: userLoginInfo.login});
        const isMatch = bcrypt.compareSync(userLoginInfo.password, user.password);
        if (isMatch) {
            delete user.password;

            return user;
        } else {
            throw new HttpException(`autentification faild`, HttpStatus.UNAUTHORIZED);
        }
    }
}
