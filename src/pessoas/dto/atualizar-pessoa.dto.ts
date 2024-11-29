import { PartialType } from '@nestjs/swagger';
import { CriarPessoaDTO } from './criar-pessoa.dto';

export class AtualizarPessoaDTO extends PartialType(CriarPessoaDTO) {}
