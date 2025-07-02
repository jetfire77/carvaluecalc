import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';  // using for password hashing and salting
import { promisify } from 'util';
import { Not } from 'typeorm';

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

    async signup(email: string, password: string) {
        // see if email is already in use
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email in use');
        }



        // Hash the user password

        // Generate a salt

        const salt = randomBytes(8).toString('hex'); // Generate a 
        // random 8-byte salt


        // Hash the password with the salt
        const hash = (await scrypt(password, salt, 32)) as Buffer; // Use scrypt to hash the password with the salt

        // join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex'); // Combine the salt and the hashed password



        // Create a new user and save it.
        const user = await this.usersService.create(email, result);  // Call the create method from UsersService to create a new user

        // Create a new user and save it to the database


        // Return the user
        return user;



    }
    async signin(email: string, password: string) {
        // Find the user by email
        const [user] = await this.usersService.find(email); // Use destructuring to get the first user

        // If no user found, throw an error
        if (!user) {
            throw new NotFoundException('User not found'); // Throw an error if the user is not found
        }

        // Extract the salt and hash from the user's password
        const [salt, storedHash] = user.password.split('.'); // Split the stored password into salt and hash

        // Hash the provided password with the same salt
        const hash = (await scrypt(password, salt, 32)) as Buffer; // Hash the provided password with the salt

        // Compare the hashed password with the stored hash
        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid credentials');
        }

        // Return the user if credentials are valid
        return user;
    }

}