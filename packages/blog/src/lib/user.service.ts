import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>,
    ) {}

    public getUsers(): Promise<User[]> {
        return this.userRepo.find();
    }

    public getUser(userId: number): Promise<User | null> {
        return this.userRepo.findOneBy({ userId });
    }

    public async addUser(user: User): Promise<User> {
        if (!user || !user.userName) {
            throw new Error('Cannot insert missing or empty user');
        }

        try {
            await this.userRepo.insert(user);
            return user;
        } catch (e) {
            // TODO: log error handling here
            console.log(`Error inserting new user: ${user.userName}`);
            throw new Error(`Error inserting new user: ${e}`);
        }
    }

    public async updateUser(userId: number, user: User): Promise<void> {
        if (!userId || !user) {
            throw new Error('Cannot update missing or empty user');
        }

        try {
            await this.userRepo.update({ userId }, user);
        } catch (e) {
            // TODO: log error handling here
            console.log(`Error updating user: ${user.userName}`);
            throw new Error(`Error updating user: ${e}`);
        }
    }
}