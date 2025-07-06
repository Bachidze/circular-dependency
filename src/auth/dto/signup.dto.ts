import { IsNotEmpty, IsString } from "class-validator"

export class SignUpDto {

    @IsNotEmpty()
    @IsString()
    fullname:string

    @IsNotEmpty()
    @IsString()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string
}