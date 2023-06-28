import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express'
import { NotFoundError } from 'rxjs';

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private prismaService: PrismaService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest()
    const token = req.headers.authorization
    if(!token) throw new UnauthorizedException("Token não localizado")

    const usuario = await this.prismaService.usuario.findUnique({
      where:{
        CODUSU: Number(token)
      }
    })
    if(!usuario) throw new NotFoundException("Token invalido")

    if(usuario.LOGADO == false) throw new UnauthorizedException("Usuario não está logado")

    return true;
  }
}
