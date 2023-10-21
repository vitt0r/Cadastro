import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NovaPessoaDto } from './dto/nova-pessoa.dto';
import { AtualizaPessoaDto } from './dto/atualiza-pessoa.dto';

@Injectable()
export class PessoaService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async novaPessoa(dados: NovaPessoaDto) {
        try {
            const validaPessoa = await this.prismaService.pessoa.findUnique({
                where: {
                    CPF: dados.CPF
                }
            })
            if (validaPessoa) throw new HttpException("Já existe esse CPF cadastrado", HttpStatus.CONFLICT)

            const novaPessoa = await this.prismaService.pessoa.create({
                data: {
                    CPF: dados.CPF,
                    NOME: dados.NOME,
                    SOBRENOME: dados.SOBRENOME,
                    TELEFONE: dados.TELEFONE,
                    CODEND: dados.CODEND
                },
                include: {
                    Endereco: true,
                }
            });
            return novaPessoa;
        } catch (error) {
            throw new BadRequestException("Dados inválidos.")
        }

    }

    async todasPessoas() {
        const pessoas = await this.prismaService.pessoa.findMany({ include: { Endereco: true }, },);

        if (!pessoas) throw new NotFoundException("Não foram encontrados pessoas cadastradas")

        return {
            mensagem: "Pessoas localizadas com sucesso",
            status: HttpStatus.ACCEPTED,
            retorno: pessoas
        }
    }

    async atualizaPessoa(dados: AtualizaPessoaDto, codpes: number) {
        const validaPessoa = await this.prismaService.pessoa.findUnique({
            where: {
                CODPES: Number(codpes)
            }
        })
        if (!validaPessoa) throw new NotFoundException("Pessoa não localizada.")

        const pessoaAtualizada = await this.prismaService.pessoa.update({
            where: {
                CODPES: Number(codpes)
            }, data: {
                TELEFONE: dados.TELEFONE,
                CODEND: dados.CODEND
            }
        })
        return {
            mensagem: "Pessoa atualizada com sucesso",
            status: HttpStatus.ACCEPTED
        }
    }

    async deletaPessoa(codpes: number) {
        const validaUsuario = await this.prismaService.pessoa.findUnique({
            where: {
                CODPES: Number(codpes)
            }
        })
        if (!validaUsuario) throw new NotFoundException("Pessoa não localizado.")

        await this.prismaService.pessoa.delete({
            where: {
                CODPES: Number(codpes)
            }
        })

        return {
            mensagem: "Pessoa deletada com sucesso",
            status: HttpStatus.ACCEPTED
        }
    }
}
