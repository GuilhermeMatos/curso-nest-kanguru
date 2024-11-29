import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTabelaTipoPessoa1730728867723 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'tipoPessoas',
        columns: [
          {
            name: 'idTipoPessoa',
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
    await queryRunner.dropTable('tipoPessoas');
  }
}
