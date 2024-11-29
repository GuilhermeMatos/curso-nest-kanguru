import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { LoginDTO } from './dto/login.dto';
import { UsuarioLogadoDTO } from './dto/usuario-logado.dto';
import { AuthGuard } from '@nestjs/passport';
import { UsuarioDTO } from './dto/usuario.dto';
import { ApiOperation } from "@nestjs/swagger";

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuarioService: UsuariosService) {}

  @ApiOperation({ summary: 'Criar um novo Usuário.' })
  @Post('criar/pessoa/:idPessoa')
  public async criar(
    @Res() response,
    @Body() criarUsuarioDTO: CriarUsuarioDTO,
    @Param('idPessoa') idPessoa: number,
  ) {
    await this.usuarioService.criar(criarUsuarioDTO, idPessoa);
    return response
      .status(HttpStatus.CREATED)
      .send('Usuario cadastrado com sucesso.');
  }

  @ApiOperation({ summary: 'Logar no sistema.' })
  @Post('logar')
  public async logar(
    @Res() response,
    @Body() logarUsuarioDTO: LoginDTO,
  ): Promise<UsuarioLogadoDTO> {
    const usuarioLogado: UsuarioLogadoDTO =
      await this.usuarioService.logar(logarUsuarioDTO);
    return response.status(HttpStatus.OK).json(usuarioLogado);
  }

  @ApiOperation({ summary: 'Buscar todos os Usuários.' })
  @Get()
  @UseGuards(AuthGuard('jwt'))
  public async buscarTodos(): Promise<UsuarioDTO[]> {
    return this.usuarioService.buscarTodos();
  }
}
