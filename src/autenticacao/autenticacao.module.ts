import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AutenticacaoService, PrismaService],
  controllers: [AutenticacaoController]
})
export class AutenticacaoModule {}
