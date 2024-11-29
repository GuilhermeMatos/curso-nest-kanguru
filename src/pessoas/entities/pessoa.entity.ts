import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, Length } from 'class-validator';
import { TipoDocumento } from './tipo-documento.entity';
import { TipoPessoa } from './tipo-pessoa.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity({ name: 'pessoas' }) // Nome da tabela no banco de dados
export class Pessoa {
  @PrimaryGeneratedColumn()
  idPessoa: number;

  @Column({ nullable: false, length: 100 })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres.' })
  nome: string;

  @Column({ nullable: false, length: 20, unique: true })
  @IsNotEmpty({ message: 'O número do documento é obrigatório.' })
  numeroDocumento: string;

  @ManyToOne(() => TipoDocumento)
  @JoinColumn({ name: 'idTipoDocumento' })
  tipoDocumento: TipoDocumento;

  @ManyToOne(() => TipoPessoa)
  @JoinColumn({ name: 'idTipoPessoa' })
  tipoPessoa: TipoPessoa;

  @OneToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'idUsuario' })
  usuario: Usuario;

  @CreateDateColumn({ type: 'timestamptz' })
  dataCadastro: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  dataAlteracao: Date;
}
