import { MigrationInterface, QueryRunner } from 'typeorm';

export class Posts1696586748127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            --Table Definition
            CREATE TABLE posts (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                title character varying NOT NULL,
                content character varying NOT NULL,
                published boolean NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid,
                

                CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY (id)
                CONSTRAINT "FK_2829ac61eff60fcec60d7274b9e" FOREIGN KEY ("user_id") REFERENCES users(id) ON DELETE SET NULL ON UPDATE CASCADE
            );
            `,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            DROP TABLE posts
            `,
      undefined,
    );
  }
}
