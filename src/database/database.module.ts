import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from '../pessoas/entities/pessoa.entity';
import { TipoPessoa } from '../pessoas/entities/tipo-pessoa.entity';
import { TipoDocumento } from '../pessoas/entities/tipo-documento.entity';
import { ConfigService } from '@nestjs/config';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: Number(configService.get('DB_PORT')),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASS'),
          database: configService.get('DB_NAME'),
          entities: [Pessoa, TipoPessoa, TipoDocumento, Usuario],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
