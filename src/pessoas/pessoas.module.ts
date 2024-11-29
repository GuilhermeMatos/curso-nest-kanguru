import { Module } from '@nestjs/common';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { TipoPessoa } from './entities/tipo-pessoa.entity';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pessoa, TipoPessoa, TipoDocumento, Usuario]),
  ],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [TypeOrmModule.forFeature([Pessoa])],
})
export class PessoasModule {}
