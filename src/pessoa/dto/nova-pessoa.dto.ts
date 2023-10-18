import { IsNotEmpty, IsString } from "class-validator"

export class NovaPessoaDto {
    @IsString()
    @IsNotEmpty()
    NOME: string
    @IsString()
    @IsNotEmpty()
    SOBRENOME: string
    @IsString()
    @IsNotEmpty()
    CPF: string
    @IsString()
    @IsNotEmpty()
    TELEFONE: string
    @IsNotEmpty()
    CODEND: number
}