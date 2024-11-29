import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { AutenticacaoModule } from '../autenticacao/autenticacao.module';
import { Pessoa } from '../pessoas/entities/pessoa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Pessoa]), AutenticacaoModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [TypeOrmModule.forFeature([Usuario])],
})
export class UsuariosModule {}
