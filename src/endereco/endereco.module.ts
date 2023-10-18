import { Module } from '@nestjs/common';
import { EnderecoController } from './endereco.controller';
import { EnderecoService } from './endereco.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [EnderecoController],
  providers: [EnderecoService,  PrismaService]
})
export class EnderecoModule {}
