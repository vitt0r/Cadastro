import { IsNotEmpty, IsString } from "class-validator"
import { NovoEnderecoDto } from "src/endereco/dto/novo-endereco.dto"

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
    ENDERECO: NovoEnderecoDto
}