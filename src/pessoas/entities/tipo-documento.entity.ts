import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

@Entity({ name: 'tipoDocumentos' })
export class TipoDocumento {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: 'O ID do tipo de documento é obrigatório.' })
  @IsInt({ message: 'O ID do tipo de documento deve ser um número inteiro.' })
  idTipoDocumento!: number;

  @Column({ nullable: false, length: 100 })
  @IsNotEmpty({ message: 'A descrição do tipo de documento é obrigatória.' })
  @IsString()
  descricao!: string;
}
