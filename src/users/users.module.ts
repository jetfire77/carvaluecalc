import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity'; // Import the User entity
@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // Specify the entities here if any
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule { }
