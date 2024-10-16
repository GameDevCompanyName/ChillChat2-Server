import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto, UserId } from './types';
import { UserDAO } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDAO)
    private usersRepository: Repository<UserDAO>
  ) {}

    public async findByName(name: string): Promise<UserDAO | undefined> {
        return this.usersRepository.findOneBy({ name });
    }

    public async findById(id: UserId): Promise<UserDAO | undefined> {
      return this.usersRepository.findOneBy({ id });
    }

    public async createUser(dto: RegisterUserDto): Promise<UserDAO> {
      if (await this.findByName(dto.name)) {
        throw new BadRequestException('Username already exists');
      }
      const newUser: Partial<UserDAO> = {
        ...dto,
        created: new Date()
      };
      const dao: UserDAO = this.usersRepository.create(newUser);
      return this.usersRepository.save(dao);
    }
}
