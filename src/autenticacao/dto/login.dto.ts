import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    EMAIL: string

    @IsNotEmpty()
    @IsString()
    SENHA: string
}