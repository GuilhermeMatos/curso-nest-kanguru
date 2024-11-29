import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { sign } from 'jsonwebtoken';
import { Request } from 'express';
import { JwtPayloadDTO } from './dto/jwt-payload.dto';

@Injectable()
export class AutenticacaoService {
  @InjectRepository(Usuario)
  private readonly usuarioRepository: Repository<Usuario>;

  public async criarTokenAcesso(idUsuario: number): Promise<string> {
    return sign({ idUsuario }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public async validarUsuario(jwtPayload: JwtPayloadDTO): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { idUsuario: jwtPayload.idUsuario },
    });
    if (!usuario) {
      throw new UnauthorizedException('Usuario não encontrado.');
    }
    return usuario;
  }

  private static extrairJWT(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Bad Request.');
    }
    const [, token] = authHeader.split(' ');
    return token;
  }

  public retornarJwt(): (request: Request) => string {
    return AutenticacaoService.extrairJWT;
  }
}
