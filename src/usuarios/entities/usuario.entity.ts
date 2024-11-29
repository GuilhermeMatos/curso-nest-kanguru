import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity({ name: 'usuarios' }) // Nome da tabela no banco de dados
export class Usuario {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column({ nullable: false, length: 100, unique: true })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @Column({ nullable: false, length: 300 })
  @IsNotEmpty({ message: 'O senha é obrigatório.' })
  senha: string;

  @OneToOne(() => Pessoa)
  @JoinColumn({ name: 'idPessoa' })
  pessoa: Pessoa;

  @CreateDateColumn({ type: 'timestamptz' })
  dataCadastro: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  dataAlteracao: Date;
}
