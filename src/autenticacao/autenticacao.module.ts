import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { JwtEstrategia } from './estrategias/jwt.estrategia';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [AutenticacaoService, JwtEstrategia],
  exports: [AutenticacaoService],
})
export class AutenticacaoModule {}
