import { IsString } from "class-validator";

export class AtualizaUsuarioDto {
    @IsString()
    SENHA: string
}