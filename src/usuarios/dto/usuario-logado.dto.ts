import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioLogadoDTO {
  @ApiProperty({ description: 'Nome Pessoa' })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'JWT de Acesso',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzdWFyaW8iOjIsImlhdCI6MTczMjMxMDI1NSwiZXhwIjoxNzMyMzEwMzE1fQ.qj5oDkLBF3Ty2Si5TpHgH7_-37ki0cHZXtJWZm70jxM',
  })
  @IsString()
  jwtToken: string;

  @ApiProperty({ description: 'Email' })
  @IsString()
  email: string;

  constructor(nome: string, jwtToken: string, email: string) {
    this.nome = nome;
    this.jwtToken = jwtToken;
    this.email = email;
  }
}
