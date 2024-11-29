import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CriarPessoaDTO } from './dto/criar-pessoa.dto';
import { AtualizarPessoaDTO } from './dto/atualizar-pessoa.dto';
import { PessoaDTO } from './dto/pessoa.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @ApiOperation({ summary: 'Buscar todas as Pessoas.' })
  @Get()
  async buscarTodos(@Res() response): Promise<PessoaDTO[]> {
    return response.status(200).json(await this.pessoasService.buscarTodos());
  }

  @ApiOperation({ summary: 'Buscar uma Pessoa por ID.' })
  @Get(':id')
  async buscarPorId(
    @Res() response,
    @Param('id') id: number,
  ): Promise<PessoaDTO> {
    const pessoa = await this.pessoasService.buscarPorId(id);
    return response.status(HttpStatus.OK).json(pessoa);
  }

  @ApiOperation({ summary: 'Criar uma nova Pessoa.' })
  @Post()
  async criar(
    @Res() response,
    @Body() criarPessoaDTO: CriarPessoaDTO,
  ): Promise<PessoaDTO> {
    const pessoaDTO = await this.pessoasService.criar(criarPessoaDTO);
    return response.status(HttpStatus.CREATED).json(pessoaDTO);
  }

  @ApiOperation({ summary: 'Atualizar uma Pessoa.' })
  @Patch(':id')
  async atualizar(
    @Res() response,
    @Param('id') id: number,
    @Body() atualizarPessoaDTO: AtualizarPessoaDTO,
  ): Promise<PessoaDTO> {
    const pessoaAlterada = await this.pessoasService.atualizar(
      id,
      atualizarPessoaDTO,
    );
    return response.status(HttpStatus.OK).json(pessoaAlterada);
  }

  @ApiOperation({ summary: 'Excluir uma Pessoa.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletar(@Param('id') id: number) {
    this.pessoasService.deletar(id);
  }
}
