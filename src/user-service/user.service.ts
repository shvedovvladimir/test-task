import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user';

@Injectable()
export class UserService {
    private readonly userRepository: Repository<User>;

    constructor(@InjectRepository(User) userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    public async getAll(): Promise<any[]> {
        return await this.userRepository.find();
    }
}
