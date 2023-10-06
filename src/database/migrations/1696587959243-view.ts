import { MigrationInterface, QueryRunner } from 'typeorm';

export class View1696587959243 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            --Table Definition
            CREATE TABLE "view" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "user_id" uuid,
                "post_id" uuid,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_0f0a6a5e1f4d5a6d0d5a6a6a5e1f4" PRIMARY KEY ("id"),
                CONSTRAINT "FK_2829ac61eff60fcec60d7274b9e" FOREIGN KEY ("user_id") REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE,
                CONSTRAINT "FK_2829ac61eff60fcec60d7274b9e" FOREIGN KEY ("post_id") REFERENCES posts(id) ON DELETE SET NULL ON UPDATE CASCADE

            )
            `,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            DROP TABLE "view"
            `,
      undefined,
    );
  }
}
