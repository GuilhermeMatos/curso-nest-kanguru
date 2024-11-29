import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AutenticacaoService } from '../autenticacao.service';
import { JwtPayloadDTO } from '../dto/jwt-payload.dto';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class JwtEstrategia extends PassportStrategy(Strategy) {
  constructor(private readonly autenticacaoService: AutenticacaoService) {
    super({
      jwtFromRequest: autenticacaoService.retornarJwt(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(jwtPayload: JwtPayloadDTO): Promise<Usuario> {
    return await this.autenticacaoService.validarUsuario(jwtPayload);
  }
}
