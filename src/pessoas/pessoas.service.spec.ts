import { PessoasService } from './pessoas.service';
import { CriarPessoaDTO } from './dto/criar-pessoa.dto';

describe('PessoasService', () => {
  let service: PessoasService;
  let dataCriacao: Date;
  let pessoaMock: any;
  let pessoaDTOMock: any;
  let pessoaRepositoryMock: any;

  beforeEach(async () => {
    service = new PessoasService();
    dataCriacao = new Date();

    pessoaMock = {
      idPessoa: 1,
      nome: 'Nome da Pessoa Criada',
      numeroDocumento: '348578345',
      dataCriacao: dataCriacao,
      dataAlteracao: null,
      tipoDocumento: {
        idTipoDocumento: 1,
        descricao: 'CPF',
      },
      tipoPessoa: {
        idTipoPessoa: 2,
        descricao: 'Pessoa Juridica',
      },
    };

    pessoaDTOMock = {
      id: pessoaMock.idPessoa,
      ...pessoaMock,
    };

    pessoaRepositoryMock = {
      create: jest.fn().mockReturnValue(Promise.resolve(pessoaMock)),
      save: jest.fn().mockReturnValue(Promise.resolve(pessoaMock)),
      update: jest.fn().mockReturnValue(Promise.resolve(pessoaMock)),
      preload: jest.fn().mockReturnValue(Promise.resolve(pessoaMock)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(pessoaMock)),
      find: jest.fn().mockReturnValue(Promise.resolve(pessoaMock)),
      remove: jest.fn().mockReturnValue(Promise.resolve(pessoaMock)),
      findOne: jest.fn((param: string) => {
        if (param['where'].numeroDocumento === '348578345') {
          return Promise.resolve(pessoaMock);
        }
        return undefined;
      }),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //TODO Descobrir por que nao consegue executar o metodo do mapper

  // it('listarTodasPessoasTest', async () => {
  //   //@ts-expect-error defined part of methods
  //   service['pessoaRepository'] = pessoaRepositoryMock;
  //
  //   expect(await service.buscarTodos()).toStrictEqual(pessoaDTOMock);
  //   expect(pessoaRepositoryMock.find).toHaveBeenCalled();
  // });

  it('criarPessoaTest', async () => {
    //@ts-expect-error defined part of methods
    service['pessoaRepository'] = pessoaRepositoryMock;

    const criarPessoaDTO: CriarPessoaDTO = {
      nome: 'Nome da Pessoa Criada',
      numeroDocumento: '222938475',
      tipoDocumento: {
        idTipoDocumento: 1,
        descricao: 'CPF',
      },
      tipoPessoa: {
        idTipoPessoa: 2,
        descricao: 'Pessoa Juridica',
      },
    };

    await service.criar(criarPessoaDTO);

    expect(pessoaRepositoryMock.create).toHaveBeenCalled();
    expect(pessoaRepositoryMock.save).toHaveBeenCalled();
  });

  it('criarPessoaBadRequestExceptionTest', async () => {
    //@ts-expect-error defined part of methods
    service['pessoaRepository'] = pessoaRepositoryMock;

    const criarPessoaDTO: CriarPessoaDTO = {
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

    await expect(service.criar(criarPessoaDTO)).rejects.toThrow(
      'Já existe uma pessoa cadastrada com o seguinte numero de documento 348578345.',
    );
  });
});
