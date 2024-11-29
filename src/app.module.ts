import { Module } from '@nestjs/common';
import { PessoasModule } from './pessoas/pessoas.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PessoasModule,
    DatabaseModule,
    UsuariosModule,
    AutenticacaoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
