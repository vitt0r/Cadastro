import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoaService } from './pessoa.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AutenticacaoGuard } from 'src/autenticacao/autenticacao.guard';

@Module({
  controllers: [PessoaController],
  providers: [PessoaService, PrismaService, AutenticacaoGuard]
})
export class PessoaModule {}
