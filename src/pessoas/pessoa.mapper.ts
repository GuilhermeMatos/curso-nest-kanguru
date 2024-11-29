// pessoa.mapper.ts

import { Pessoa } from './entities/pessoa.entity';
import { PessoaDTO } from './dto/pessoa.dto';

export const pessoaToDTO = (pessoa: Pessoa): PessoaDTO => {
  const {
    idPessoa,
    nome,
    numeroDocumento,
    dataCadastro,
    dataAlteracao,
    tipoPessoa,
    tipoDocumento,
  } = pessoa; // Extraia os campos que você quer no DTO
  return {
    id: idPessoa,
    nome,
    numeroDocumento,
    dataCadastro,
    dataAlteracao,
    tipoPessoa,
    tipoDocumento,
  }; // Retorne um novo objeto DTO
};

// Função para converter um array de entidades
export const pessoasToDTOs = (pessoas: Pessoa[]): PessoaDTO[] => {
  return pessoas.map(pessoaToDTO);
};
