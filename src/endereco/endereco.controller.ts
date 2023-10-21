import { Body, Controller, Post , Get, Put, UseGuards, Param, Delete} from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { NovoEnderecoDto } from './dto/novo-endereco.dto';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';
import { AtualizaEnderecoDto } from './dto/atualiza-endereco';

@Controller('endereco')
export class EnderecoController {
    constructor(
        private enderecoService: EnderecoService
    ) {}

    @Post()
    async criarEndereco(@Body() dados: NovoEnderecoDto){
        return await this.enderecoService.novoEndereco(dados)
    }

    @Get()
    async todoEnderecos() {
        return await this.enderecoService.todosEnderecos()
    }

    @Put("/atualizar/:codend")
    async atualizaEndereco(@Body() dados: AtualizaEnderecoDto, @Param("codend") codend: number) {
        return await this.enderecoService.atualizaEndereco(dados, codend)
    }

    @Delete("/deletar/:codend")
    async deletarEndereco(@Param("codend") codend: number) {
        return await this.enderecoService.deletaEndereco(codend)
    }

    @Get("/buscar/:cep")
    async buscaEndereco(@Param('cep') cep: string){
        try {
            const address = await this.enderecoService.buscaEndereco(cep);
            return address;
          } catch (error) {
            return { error: error.message };
          }
    }
}
