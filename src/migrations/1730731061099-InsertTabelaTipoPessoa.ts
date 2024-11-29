import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTabelaTipoPessoa1730731061099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "tipoPessoas" ("idTipoPessoa", descricao)
       VALUES (1, 'Pessoa Fisica');`,
    );
    await queryRunner.query(
      `INSERT INTO "tipoPessoas" ("idTipoPessoa", descricao)
       VALUES (2, 'Pessoa Juridica');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE
       FROM "tipoPessoas"
       WHERE "idTipoPessoa" = 1;`,
    );
    await queryRunner.query(
      `DELETE
       FROM "tipoPessoas"
       WHERE "idTipoPessoa" = 2;`,
    );
  }
}
