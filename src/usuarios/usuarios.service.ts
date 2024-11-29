import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { AutenticacaoService } from '../autenticacao/autenticacao.service';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { LoginDTO } from './dto/login.dto';
import { UsuarioLogadoDTO } from './dto/usuario-logado.dto';
import { NotFoundError } from '../comum/erros/not-found.error';
import { BadRequestError } from '../comum/erros/bad-request.error';
import { usuariosToDTOs } from './usuario.mapper';
import { UsuarioDTO } from './dto/usuario.dto';

@Injectable()
export class UsuariosService {
  @Inject()
  private readonly autenticacaoService: AutenticacaoService;

  @InjectRepository(Pessoa)
  private readonly pessoaRepository: Repository<Pessoa>;

  @InjectRepository(Usuario)
  private readonly usuarioRepository: Repository<Usuario>;

  public async criar(criarUsuarioDTO: CriarUsuarioDTO, idPessoa: number) {
    await this.verificarEmail(criarUsuarioDTO.email);
    const pessoa = await this.pessoaRepository.findOne({
      where: { idPessoa },
    });

    if (!pessoa) {
      throw new NotFoundError(
        `A pessoa com id ${idPessoa} não foi encontrada.`,
      );
    }

    const usuario = this.usuarioRepository.create({
      pessoa: pessoa,
      senha: await bcrypt.hash(criarUsuarioDTO.senha, 10),
      email: criarUsuarioDTO.email,
    });
    await this.usuarioRepository.save(usuario);
  }

  public async logar(loginDTO: LoginDTO): Promise<UsuarioLogadoDTO> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        email: loginDTO.email,
      },
      relations: ['pessoa'],
    });

    if (!usuario) {
      throw new NotFoundError(
        `A usuario com email ${loginDTO.email} não foi encontrado.`,
      );
    }

    await this.verificarSenha(loginDTO.senha, usuario);

    const jwtToken = await this.autenticacaoService.criarTokenAcesso(
      usuario.idUsuario,
    );

    return new UsuarioLogadoDTO(usuario.pessoa.nome, jwtToken, usuario.email);
  }

  public async buscarTodos(): Promise<UsuarioDTO[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuariosToDTOs(usuarios);
  }

  private async verificarEmail(email: string) {
    const usuarioConsultado = await this.usuarioRepository.findOne({
      where: {
        email,
      },
    });

    if (usuarioConsultado) {
      throw new BadRequestError(
        `Já existe um usuário cadastrado com o seguinte email: ${usuarioConsultado.email}.`,
      );
    }
  }

  private async verificarSenha(
    senha: string,
    usuario: Usuario,
  ): Promise<boolean> {
    const isValido = await bcrypt.compare(senha, usuario.senha);

    if (!isValido) {
      throw new NotFoundError(`A senha está invalida.`);
    }
    return isValido;
  }
}
