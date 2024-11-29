import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTabelaPessoa1730729288286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'pessoas',
        columns: [
          {
            name: 'idPessoa',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'nome',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'numeroDocumento',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'idTipoDocumento',
            type: 'smallint',
          },
          {
            name: 'idTipoPessoa',
            type: 'smallint',
          },
          {
            name: 'dataCadastro',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'dataAlteracao',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );

    // Chaves estrangeiras

    await queryRunner.createForeignKey(
      'pessoas',
      new TableForeignKey({
        name: 'FK_TIPO_DOCUMENTO',
        columnNames: ['idTipoDocumento'],
        referencedTableName: 'tipoDocumentos',
        referencedColumnNames: ['idTipoDocumento'],
      }),
    );

    await queryRunner.query(`ALTER TABLE pessoas
        ADD CONSTRAINT "FK_TIPO_PESSOA" FOREIGN KEY ("idTipoPessoa") REFERENCES "tipoPessoas" ("idTipoPessoa");`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('pessoas', 'FK_TIPO_PESSOA');
    await queryRunner.dropForeignKey('pessoa', 'FK_TIPO_DOCUMENTO');
    await queryRunner.dropTable('pessoas');
  }
}
