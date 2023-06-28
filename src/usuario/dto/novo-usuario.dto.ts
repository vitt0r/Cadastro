import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class NovoUsuarioDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    EMAIL: string
    
    @IsString()
    @IsNotEmpty()
    SENHA: string
}