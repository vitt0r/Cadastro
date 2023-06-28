import { Injectable, NotFoundException, HttpStatus, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AutenticacaoService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async login(dados: LoginDto) {
        const usuario = await this.prismaService.usuario.findUnique({
            where: {
                EMAIL: dados.EMAIL
            }
        })
        if (!usuario) throw new NotFoundException("Usuário não cadastrado")

        const usuarioLogado = await this.prismaService.usuario.update({
            where: {
                CODUSU: usuario.CODUSU
            }, data: {
                LOGADO: true
            }, select: {
                EMAIL: true, LOGADO: true
            }
        })

        return {
            mensagem: "Usuario logado com sucesso",
            status: HttpStatus.ACCEPTED,
            retorno: usuarioLogado
        }

    }

    async logout(token: number) {
        const usuarioLogado = await this.prismaService.usuario.findUnique({
            where: {
                CODUSU: Number(token)
            }
        })
        if (!usuarioLogado || usuarioLogado.LOGADO == false) throw new BadRequestException("O usuário não está logado")

        const usuarioDeslogado = await this.prismaService.usuario.update({
            where: {
                CODUSU: usuarioLogado.CODUSU
            }, data: {
                LOGADO: false
            }, select: {
                EMAIL: true, LOGADO: true
            }
        })

        return {
            mensagem: "Usuario deslogado com sucesso",
            status: HttpStatus.ACCEPTED,
            retorno: usuarioDeslogado
        }

    }
}
