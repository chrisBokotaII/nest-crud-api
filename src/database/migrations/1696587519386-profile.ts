import { MigrationInterface, QueryRunner } from 'typeorm';

export class Profile1696587519386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            --Table Definition
            CREATE TABLE "profile" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "gender" character varying NOT NULL,
                "photo" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_6b9f1b4f47f5c8d7f4d9c7f6f2d8a5f3b" PRIMARY KEY ("id")
            )
            `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            DROP TABLE "profiles"
            `,
      undefined,
    );
  }
}
