import { Injectable } from '@nestjs/common';
import { UserDto } from './types';

@Injectable()
export class UserService {
    private users: UserDto[] = [
        {
            id: 1,
            name: 'john',
            password: 'changeme',
          },
          {
            id: 2,
            name: 'maria',
            password: 'guess',
          },
    ];

    public async findByName(name: string): Promise<UserDto | undefined> {
        return this.users.find(u => u.name === name);
    }
}
