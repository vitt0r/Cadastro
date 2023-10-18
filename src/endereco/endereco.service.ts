import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NovoEnderecoDto } from './dto/novo-endereco.dto';
import { AtualizaEnderecoDto } from './dto/atualiza-endereco';
import axios from 'axios';

@Injectable()
export class EnderecoService {
    constructor(
        private prismaService: PrismaService
    ) { }
    async novoEndereco(dados: NovoEnderecoDto) {
        const novoEndereco = await this.prismaService.endereco.create({
            data: {
                CEP: dados.CEP,
                ENDERECO: dados.ENDERECO,
                NUMERO: dados.NUMERO,
                BAIRRO: dados.BAIRRO,
                UF: dados.UF,
                ESTADO: dados.ESTADO,
                COMPLEMENTO: dados.COMPLEMENTO
            }
        });
        return novoEndereco;
    }

    async todosEnderecos() {
        const endereco = await this.prismaService.endereco.findMany()

        if (!endereco) throw new NotFoundException("Não foram encontrado usuarios cadastrados")

        return {
            mensagem: "Usuarios localizados com sucesso",
            status: HttpStatus.ACCEPTED,
            retorno: endereco
        }
    }

    async atualizaEndereco(dados: AtualizaEnderecoDto, codend: number) {
        const validaEndereco = await this.prismaService.endereco.findUnique({
            where: {
                CODEND: Number(codend)
            }
        })
        if (!validaEndereco) throw new NotFoundException("Endereco não encontrado.")

        const enderecoAtualizado = await this.prismaService.endereco.update({
            where: {
                CODEND: Number(codend)
            }, data: {
                CEP: dados.CEP,
                ENDERECO: dados.ENDERECO,
                NUMERO: dados.NUMERO,
                BAIRRO: dados.BAIRRO,
                UF: dados.UF,
                ESTADO: dados.ESTADO,
                COMPLEMENTO: dados.COMPLEMENTO
            }
        })

        return {
            mensagem: "Endereco atualizado com sucesso",
            status: HttpStatus.ACCEPTED
        }
    }

    async deletaEndereco(codend: number) {
        const validaEndereco = await this.prismaService.endereco.findUnique({
            where: {
                CODEND: Number(codend)
            }
        })
        if (!validaEndereco) throw new NotFoundException("Endereco não encontrado.")

        await this.prismaService.endereco.delete({
            where: {
                CODEND: Number(codend)
            }
        })

        return {
            mensagem: "Endereco deletado com sucesso",
            status: HttpStatus.ACCEPTED
        }

    }

    async buscaEndereco(cep: string) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw new Error('Erro ao buscar o CEP');
        }
    }
}
