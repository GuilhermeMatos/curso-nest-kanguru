import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TipoPessoaDTO {
  @ApiProperty({ description: 'Id Tipo Pessoa', example: '1' })
  @IsInt()
  idTipoPessoa: number;

  @ApiProperty({
    description: 'Descrição Tipo Pessoa',
    example: 'Pessoa Fisica',
  })
  @IsString()
  descricao: string;

  constructor(tipoPessoa: any) {
    this.idTipoPessoa = tipoPessoa.idTipoPessoa;
    this.descricao = tipoPessoa.descricao;
  }
}
