// usuario.mapper.ts
import { Usuario } from './entities/usuario.entity';
import { UsuarioDTO } from './dto/usuario.dto';

export const usuarioToDTO = (usuario: Usuario): UsuarioDTO => {
  const { idUsuario, email, dataCadastro, dataAlteracao } = usuario; // Extraia os campos que você quer no DTO
  return {
    id: idUsuario,
    email,
    dataCadastro,
    dataAlteracao,
  }; // Retorne um novo objeto DTO
};

// Função para converter um array de entidades
export const usuariosToDTOs = (usuarios: Usuario[]): UsuarioDTO[] => {
  return usuarios.map(usuarioToDTO);
};
