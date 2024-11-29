import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TipoPessoa } from './entities/tipo-pessoa.entity';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from './pessoas.module';
import request from 'supertest';

describe('PessoasController e2e Tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let pessoas: Pessoa[];

  const dataSourceTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Pessoa, TipoPessoa, TipoDocumento],
    synchronize: true,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        PessoasModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceTest;
          },
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    data = {
      nome: 'Nome da Pessoa Criada',
      numeroDocumento: '348578345',
      tipoDocumento: {
        idTipoDocumento: 1,
        descricao: 'CPF',
      },
      tipoPessoa: {
        idTipoPessoa: 2,
        descricao: 'Pessoa Juridica',
      },
    };
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceTest).initialize();
    const pessoaRepository = dataSource.getRepository(Pessoa);
    pessoas = await pessoaRepository.find();

    const tipoDocumentoRepository = dataSource.getRepository(TipoDocumento);

    const tipoDocCPF: TipoDocumento = tipoDocumentoRepository.create({
      idTipoDocumento: 1,
      descricao: 'CPF',
    });
    await tipoDocumentoRepository.save(tipoDocCPF);

    const tipoDocRG: TipoDocumento = tipoDocumentoRepository.create({
      idTipoDocumento: 2,
      descricao: 'RG',
    });
    await tipoDocumentoRepository.save(tipoDocRG);

    const tipoPessoaRepository = dataSource.getRepository(TipoPessoa);

    const tipoPessoaFisica: TipoPessoa = tipoPessoaRepository.create({
      idTipoPessoa: 1,
      descricao: 'Pessoa Fisica',
    });
    await tipoPessoaRepository.save(tipoPessoaFisica);

    const tipoPessoaJuridica: TipoPessoa = tipoPessoaRepository.create({
      idTipoPessoa: 2,
      descricao: 'Pessoa Juridica',
    });

    await tipoPessoaRepository.save(tipoPessoaJuridica);

    await dataSource.destroy();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('POST /pessoas', () => {
    it('criarPessoaTest', async () => {
      const resposta = await request(app.getHttpServer())
        .post('/pessoas')
        .send(data)
        .expect(HttpStatus.CREATED);
      console.log(resposta.body);
    });
  });
});
