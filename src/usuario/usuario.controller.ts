import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { NovoUsuarioDto } from './dto/novo-usuario.dto';
import { AtualizaUsuarioDto } from './dto/atualiza-usuario.dto';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';

@Controller('usuario')
export class UsuarioController {
    constructor(
        private usuarioService: UsuarioService
    ) {}

    @Post()
    async criarUsuario(@Body() dados: NovoUsuarioDto) {
        return await this.usuarioService.novoUsuario(dados)
    }

    @Get()
    async todosUsuarios() {
        return await this.usuarioService.todosUsuarios()
    }

    @Put("/atualizar/:codusu")
    @UseGuards(AutenticacaoGuard)
    async atualizaUsuario(@Body() dados: AtualizaUsuarioDto, @Param("codusu") codusu: number) {
        return await this.usuarioService.atualizaUsuario(dados, codusu)
    }

    @Delete("/deletar/:codusu")
    async deletarUsuario(@Param("codusu") codusu: number) {
        return await this.usuarioService.deletaUsuario(codusu)
    }


}
