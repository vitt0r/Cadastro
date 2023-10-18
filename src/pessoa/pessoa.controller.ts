import { Body, Controller, Post, Get, Put, Param, Delete } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { NovaPessoaDto } from './dto/nova-pessoa.dto';
import { AtualizaPessoaDto } from './dto/atualiza-pessoa.dto';

@Controller('pessoa')
export class PessoaController {
    constructor(
        private pessoaService: PessoaService
    ) {}

    @Post()
    async criarPessoa(@Body() dados: NovaPessoaDto){
        return await this.pessoaService.novaPessoa(dados)
    }

    @Get()
    async todasPessoas(){
        return await this.pessoaService.todasPessoas()
    }
    @Put("/atualizar/:codpes")
    async atualizaPessoa(@Body() dados: AtualizaPessoaDto, @Param("codpes") codpes: number){
        return await this.pessoaService.atualizaPessoa(dados, codpes)
    }

    @Delete("/deletar/:codpes")
    async deletarPessoa(@Param("codpes") codpes: number){
        return await this.pessoaService.deletaPessoa(codpes)
    }
    
}
