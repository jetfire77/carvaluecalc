import { Expose } from "class-transformer";

// these property should go outside world
export class UserDto {
    @Expose()
    id: number;

    @Expose()
    email: string;

}