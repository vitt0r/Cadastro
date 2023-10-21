import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NovoUsuarioDto } from './dto/novo-usuario.dto';
import { AtualizaUsuarioDto } from './dto/atualiza-usuario.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsuarioService {
    constructor(
        private prismaService: PrismaService
    ) { }

    async novoUsuario(dados: NovoUsuarioDto) {
        try {
            const validaUsuario = await this.prismaService.usuario.findUnique({
                where: {
                    EMAIL: dados.EMAIL
                }
            });
    
            if (validaUsuario) {
                throw new HttpException("Já existe usuário cadastrado com esse email", HttpStatus.CONFLICT);
            }
    
            const senhaCriptografada = await this.hashPassword(dados.SENHA);
    
            const novoUsuario = await this.prismaService.usuario.create({
                data: {
                    EMAIL: dados.EMAIL,
                    SENHA: senhaCriptografada
                }, 
                select: {
                    EMAIL: true, LOGADO: true
                }
            });
    
            return {
                mensagem: "Usuário criado com sucesso",
                status: HttpStatus.CREATED,
                retorno: novoUsuario
            };
        } catch (error) {
            throw new BadRequestException("Dados inválidos.");
        }
    }
    
    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // Número de salt rounds
        return bcrypt.hash(password, saltRounds);
    }
    
    async todosUsuarios() {
        const usuarios = await this.prismaService.usuario.findMany()

        if (!usuarios) throw new NotFoundException("Não foram encontrado usuarios cadastrados")

        return {
            mensagem: "Usuarios localizados com sucesso",
            status: HttpStatus.ACCEPTED,
            retorno: usuarios
        }
    }

    async atualizaUsuario(dados: AtualizaUsuarioDto, codusu: number) {
        const validaUsuario = await this.prismaService.usuario.findUnique({
            where: {
                CODUSU: Number(codusu)
            }
        })
        if (!validaUsuario) throw new NotFoundException("Usuario não localizado.")

        const usuarioAtualizado = await this.prismaService.usuario.update({
            where: {
                CODUSU: Number(codusu)
            }, data: {
                SENHA: dados.SENHA
            }
        })

        return {
            mensagem: "Usuario atualizado com sucesso",
            status: HttpStatus.ACCEPTED
        }

    }

    async deletaUsuario(codusu: number) {
        const validaUsuario = await this.prismaService.usuario.findUnique({
            where: {
                CODUSU: Number(codusu)
            }
        })
        if (!validaUsuario) throw new NotFoundException("Usuario não localizado.")

        await this.prismaService.usuario.delete({
            where: {
                CODUSU: Number(codusu)
            }
        })

        return {
            mensagem: "Usuario deletado com sucesso",
            status: HttpStatus.ACCEPTED
        }
    }
}
