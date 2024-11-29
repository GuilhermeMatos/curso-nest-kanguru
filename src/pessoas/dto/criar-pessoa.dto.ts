import { IsObject, IsString } from 'class-validator';
import { TipoDocumentoDTO } from './tipo-documento.dto';
import { TipoPessoaDTO } from './tipo-pessoa.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CriarPessoaDTO {
  @ApiProperty({ description: 'Nome da pessoa' })
  @IsString()
  readonly nome: string;

  @ApiProperty({ description: 'Numero do Documento' })
  @IsString()
  readonly numeroDocumento: string;

  @ApiProperty({ description: 'Tipo Documento' })
  @IsObject()
  readonly tipoDocumento: TipoDocumentoDTO;

  @IsObject()
  @ApiProperty({ description: 'Tipo Pessoa' })
  readonly tipoPessoa: TipoPessoaDTO;
}
