import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDTO {
  @ApiProperty({ description: 'Id do Usuário' })
  id: number;

  @ApiProperty({ description: 'Email do Usuário' })
  email: string;

  @ApiProperty({ description: 'Data Cadastro' })
  dataCadastro: Date;

  @ApiProperty({ description: 'Data da Ultima Alteração' })
  dataAlteracao: Date;

  constructor(
    id: number,
    email: string,
    dataCadastro: Date,
    dataAlteracao: Date,
  ) {
    this.id = id;
    this.email = email;
    this.dataCadastro = dataCadastro;
    this.dataAlteracao = dataAlteracao;
  }
}
