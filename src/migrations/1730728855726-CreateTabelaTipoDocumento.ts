import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTabelaTipoDocumento1730728855726
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'tipoDocumentos',
        columns: [
          {
            name: 'idTipoDocumento',
            type: 'smallint',
            isPrimary: true,
          },
          {
            name: 'descricao',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tipoDocumentos');
  }
}
