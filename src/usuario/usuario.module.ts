import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService, PrismaService, AutenticacaoGuard]
})
export class UsuarioModule {}
