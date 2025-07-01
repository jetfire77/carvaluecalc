import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    //So without a doubt, our service needs a copy or 
    // it needs to get access to the user's repository.

    // dependency injection
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }
    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        console.log('User not found');
        return this.repo.save(user);
    }


    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }



    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return this.repo.remove(user);
    }


}

//   const usersService =  new UsersService({} as any);
//     usersService.update(1, { color: 'red' })
