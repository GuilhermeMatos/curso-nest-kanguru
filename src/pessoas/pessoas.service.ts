import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { CriarPessoaDTO } from './dto/criar-pessoa.dto';
import { AtualizarPessoaDTO } from './dto/atualizar-pessoa.dto';
import { pessoasToDTOs, pessoaToDTO } from './pessoa.mapper';
import { PessoaDTO } from './dto/pessoa.dto';
import { NotFoundError } from '../comum/erros/not-found.error';
import { BadRequestError } from '../comum/erros/bad-request.error';

@Injectable()
export class PessoasService {
  @InjectRepository(Pessoa)
  private readonly pessoaRepository: Repository<Pessoa>;

  async buscarTodos(): Promise<PessoaDTO[]> {
    const pessoas: Pessoa[] = await this.pessoaRepository.find({
      relations: ['tipoDocumento', 'tipoPessoa', 'usuario'],
    });

    return pessoasToDTOs(pessoas);
  }

  async buscarPorId(id: number): Promise<PessoaDTO> {
    const pessoa = await this.pessoaRepository.findOne({
      where: { idPessoa: id },
      relations: ['tipoDocumento', 'tipoPessoa', 'usuario'],
    });

    if (!pessoa) {
      throw new NotFoundError(`A pessoa com id ${id} não foi encontrada.`);
    }

    return pessoaToDTO(pessoa);
  }

  async criar(criarPessoaDTO: CriarPessoaDTO) {
    await this.verificarNumeroDocumento(criarPessoaDTO.numeroDocumento);
    const pessoa = this.pessoaRepository.create(criarPessoaDTO);
    return pessoaToDTO(await this.pessoaRepository.save(pessoa));
  }

  async atualizar(id: number, atualizarPessoaDTO: AtualizarPessoaDTO) {
    await this.verificarNumeroDocumento(atualizarPessoaDTO.numeroDocumento);
    const pessoa = await this.pessoaRepository.preload({
      ...atualizarPessoaDTO,
      idPessoa: id,
    });

    if (!pessoa) {
      throw new NotFoundError(`A pessoa com id ${id} não foi encontrada.`);
    }

    this.pessoaRepository.save(pessoa);
  }

  async deletar(id: number) {
    const pessoa = await this.pessoaRepository.findOne({
      where: { idPessoa: id },
    });

    if (!pessoa) {
      throw new NotFoundError(`A pessoa com id ${id} não foi encontrada.`);
    }
    this.pessoaRepository.remove(pessoa);
  }

  private async verificarNumeroDocumento(numeroDocumento: string) {
    const pessoaConsultada = await this.pessoaRepository.findOne({
      where: {
        numeroDocumento,
      },
    });

    if (pessoaConsultada) {
      throw new BadRequestError(
        `Já existe uma pessoa cadastrada com o seguinte numero de documento: ${pessoaConsultada.numeroDocumento}.`,
      );
    }
  }
}
