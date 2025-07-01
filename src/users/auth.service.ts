import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) { }

    signup(email: string, password: string) {
        // see if email is already in use



        // Hash the password

        // Create a new user and save it to the database


        // Return the user



    }
    signin() { }

}