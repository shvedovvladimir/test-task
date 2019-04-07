import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';

@Exclude()
export class UserLoginDto {
    @Expose()
    @IsNotEmpty()
    @Type(() => Date)
    public login: string;

    @Expose()
    @IsString()
    public password: string;
}
