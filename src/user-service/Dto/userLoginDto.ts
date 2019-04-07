import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Expose, Exclude, Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

@Exclude()
export class UserLoginDto {
    @ApiModelProperty()
    @Expose()
    @IsNotEmpty()
    public login: string;

    @ApiModelProperty()
    @Expose()
    @IsString()
    public password: string;
}
