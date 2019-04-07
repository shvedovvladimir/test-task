import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';
import { UserDto } from './Dto/userDto';
import { IUser } from './interfaces/user.interface';
import { UserLoginDto } from './Dto/userLoginDto';
import * as bcrypt from 'bcrypt-nodejs';
import * as Redis from 'ioredis';
import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import { LoginResponse } from './interfaces/loginResponse.interface';

@Injectable()
export class UserService {
    private readonly userRepository: Repository<User>;
    private redis = new Redis();

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

    public async login(userLoginInfo: UserLoginDto): Promise<LoginResponse> {
        const user = await this.userRepository.findOne({login: userLoginInfo.login});
        if (!user) {
            throw new HttpException(`user not found`, HttpStatus.NOT_FOUND);
        }
        const isMatch = bcrypt.compareSync(userLoginInfo.password, user.password);
        if (isMatch) {
            delete user.password;
            const token = this.addToken(user);
            this.redis.set(token, JSON.stringify(user));

            return { token };
        } else {
            throw new HttpException(`autentification faild`, HttpStatus.UNAUTHORIZED);
        }
    }

    public async logout(authHeader: string): Promise<boolean> {
        const token = await this.redis.get(authHeader);
        if (token) {
            await this.redis.del(authHeader);

            return true;
        } else {
            throw new HttpException(`autentification faild`, HttpStatus.UNAUTHORIZED);
        }
    }

    private addToken(user: IUser): string {
        const payload = {
            iss: 'shGroup',
            sub: 'auth',
            aud: 'test_task_mtc',
            iat: new Date().getTime(),
            jti: user.id,
            tokenId: v4(),
        };

        const token = jwt.sign(JSON.stringify(payload), user.login);

        return token;
    }
}
