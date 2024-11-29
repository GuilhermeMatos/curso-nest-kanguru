import { TipoDocumentoDTO } from './tipo-documento.dto';
import { TipoPessoaDTO } from './tipo-pessoa.dto';
import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PessoaDTO {
  @ApiProperty({ description: 'Id Pessoa' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Nome Pessoa' })
  @IsString()
  nome: string;

  @ApiProperty({ description: 'Numero Documento' })
  @IsString()
  numeroDocumento: string;

  @ApiProperty({ description: 'Tipo Documento' })
  @IsObject()
  tipoDocumento: TipoDocumentoDTO;

  @ApiProperty({ description: 'Tipo Pessoa' })
  @IsObject()
  tipoPessoa: TipoPessoaDTO;

  @ApiProperty({ description: 'Data Cadastro' })
  @IsDate()
  dataCadastro: Date;

  @ApiProperty({ description: 'Data da Ultima Alteração' })
  @IsDate()
  dataAlteracao: Date | null;

  constructor(pessoa: any) {
    this.id = pessoa.id;
    this.nome = pessoa.nome;
    this.numeroDocumento = pessoa.numeroDocumento;
    this.tipoDocumento = pessoa.tipoDocumento;
    this.tipoPessoa = pessoa.tipoPessoa;
    this.dataCadastro = pessoa.dataCadastro;
    this.dataAlteracao = pessoa.dataAlteracao;
  }
}
