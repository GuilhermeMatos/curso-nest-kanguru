import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateTabelaTipoDocumento1730728855726 } from '../migrations/1730728855726-CreateTabelaTipoDocumento';
import { CreateTabelaTipoPessoa1730728867723 } from '../migrations/1730728867723-CreateTabelaTipoPessoa';
import { CreateTabelaPessoa1730729288286 } from '../migrations/1730729288286-CreateTabelaPessoa';
import { InsertTabelaTipoDocumento1730730454653 } from '../migrations/1730730454653-InsertTabelaTipoDocumento';
import { InsertTabelaTipoPessoa1730731061099 } from '../migrations/1730731061099-InsertTabelaTipoPessoa';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { TipoPessoa } from '../pessoas/entities/tipo-pessoa.entity';
import { TipoDocumento } from '../pessoas/entities/tipo-documento.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Pessoa, TipoPessoa, TipoDocumento],
  synchronize: false,
};

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateTabelaTipoDocumento1730728855726,
    CreateTabelaTipoPessoa1730728867723,
    CreateTabelaPessoa1730729288286,
    InsertTabelaTipoDocumento1730730454653,
    InsertTabelaTipoPessoa1730731061099,
  ],
});
