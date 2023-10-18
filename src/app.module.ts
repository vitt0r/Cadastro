import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';
import { PessoaModule } from './pessoa/pessoa.module';
import { EnderecoModule } from './endereco/endereco.module';

@Module({
  imports: [UsuarioModule, AutenticacaoModule, PessoaModule, EnderecoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
