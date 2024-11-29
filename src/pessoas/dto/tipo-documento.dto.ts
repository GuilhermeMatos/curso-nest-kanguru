import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TipoDocumentoDTO {
  @ApiProperty({ description: 'Id Tipo Documento', example: '1' })
  @IsInt()
  idTipoDocumento: number;

  @ApiProperty({ description: 'Descrição Tipo Documento', example: 'CPF' })
  @IsString()
  descricao: string;

  constructor(tipoDocumento: any) {
    this.idTipoDocumento = tipoDocumento.idTipoDocumento;
    this.descricao = tipoDocumento.descricao;
  }
}
