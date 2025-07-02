import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity'; // Import the User entity
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // Specify the entities here if any
  ],
  controllers: [UsersController],
  providers: [UsersService,
    AuthService,
    // globally scoped interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor
    }
  ],

})
export class UsersModule { }
