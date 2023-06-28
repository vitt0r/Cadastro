import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { LoginDto } from './dto/login.dto';

@Controller('autenticacao')
export class AutenticacaoController {
    constructor(
        private autenticacaoService: AutenticacaoService
    ) { }

    @Post("/login")
    async login(@Body() dados: LoginDto) {
        return await this.autenticacaoService.login(dados)
    }

    @Get("/logout")
    async logout(@Headers("Authorization") authHeader: number) {
        return await this.autenticacaoService.logout(authHeader)
    }
}
