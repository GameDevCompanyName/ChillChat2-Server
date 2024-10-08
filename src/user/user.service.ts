import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserDto, UserDto, UserId, UserSafeDto } from './types';

@Injectable()
export class UserService {
    private users: UserDto[] = [
        {
            id: 0,
            name: 'john',
            password: 'changeme',
            created: new Date().getUTCMilliseconds()
          },
          {
            id: 1,
            name: 'maria',
            password: 'guess',
            created: new Date().getUTCMilliseconds()
          },
    ];

    public async findByName(name: string): Promise<UserDto | undefined> {
        return this.users.find(u => u.name === name);
    }

    public async getById(id: UserId): Promise<UserDto | undefined> {
      return this.users.find(u => u.id === id);
    }

    public async createUser(dto: RegisterUserDto): Promise<UserDto> {
      if (await this.findByName(dto.name)) {
        throw new BadRequestException('Username already exists');
      }
      if (!this.validate(dto)) {
        throw new BadRequestException('Bruh what is this user info??');
      }
      const newUser: UserDto = {
        ...dto,
        created: new Date().getUTCMilliseconds(),
        id: this.users.length
      };
      this.users.push(newUser);
      return newUser;
    }

    validate(dto: RegisterUserDto): boolean {
      // TODO replace with pipes!
      // if (dto.name.trim.length < 4 || dto.name.includes(' ')) {
      //   return false;
      // }
      return true;
    }
}
