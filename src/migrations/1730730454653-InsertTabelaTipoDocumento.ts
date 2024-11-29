import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertTabelaTipoDocumento1730730454653
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "tipoDocumentos" ("idTipoDocumento", descricao) VALUES(1,'CPF');`,
    );

    await queryRunner.query(
      `INSERT INTO "tipoDocumentos" ("idTipoDocumento", descricao) VALUES(2, 'RG');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "tipoDocumentos" WHERE "idTipoDocumento"=1;`,
    );
    await queryRunner.query(
      `DELETE
       FROM "tipoDocumentos"
       WHERE "idTipoDocumento" = 2;`,
    );
  }
}
