import {
    Body, Controller,
    Post,
    Get,
    Patch,
    Param,
    Query,
    Delete,
    NotFoundException,
    ClassSerializerInterceptor,
    Session,
    UseGuards

} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from '../guards/auth.guard';

import { User } from './user.entity';

@Controller('auth')
@Serialize(UserDto)

export class UsersController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    // @Get('/whoami')
    // whoAmI(@Session() session: any) {
    //     return this.usersService.findOne(session.userId);
    // }


    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User) {

        return user;


    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }


    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color

    }


    // @Post('/signup')
    // createUser(@Body() body: CreateUserDto) {
    //     console.log('Creating user with body:', body);
    //     this.authService.signup(body.email, body.password);
    // }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        console.log('Creating user with body:', body);
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id
        return user
    }


    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        console.log('Signing in user with body:', body);
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id
        return user
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('handler is running');
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        console.log('Removing user with id:', id);
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        console.log('Updating user with id:', id, 'and body:', body);
        return this.usersService.update(parseInt(id), body);
    }
}