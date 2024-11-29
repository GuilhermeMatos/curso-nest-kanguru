import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

@Entity({ name: 'tipoPessoas' })
export class TipoPessoa {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: 'O tipo de pessoa é obrigatório.' })
  @IsInt({ message: 'O tipo de pessoa deve ser um número inteiro.' })
  idTipoPessoa!: number;

  @Column({ nullable: false, length: 100 })
  @IsNotEmpty({ message: 'A descrição do tipo de pessoa é obrigatória.' })
  @IsString()
  descricao!: string;
}
