const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class EntityCreation1666119338153 {
  name = 'EntityCreation1666119338153';

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "coaches" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "salary" double precision NOT NULL DEFAULT '0',
                "club_id" uuid,
                CONSTRAINT "PK_eddaece1a1f1b197fa39e6864a1" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "players" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "salary" double precision NOT NULL DEFAULT '0',
                "club_id" uuid,
                CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "clubs" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "budget" double precision NOT NULL DEFAULT '0',
                CONSTRAINT "PK_bb09bd0c8d5238aeaa8f86ee0d4" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "coaches"
            ADD CONSTRAINT "FK_a4a0dbead64f9afc77782232c82" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "players"
            ADD CONSTRAINT "FK_a5426cbe2c827e9ec511b3d00a5" FOREIGN KEY ("club_id") REFERENCES "clubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "players" DROP CONSTRAINT "FK_a5426cbe2c827e9ec511b3d00a5"
        `);
    await queryRunner.query(`
            ALTER TABLE "coaches" DROP CONSTRAINT "FK_a4a0dbead64f9afc77782232c82"
        `);
    await queryRunner.query(`
            DROP TABLE "clubs"
        `);
    await queryRunner.query(`
            DROP TABLE "players"
        `);
    await queryRunner.query(`
            DROP TABLE "coaches"
        `);
  }
};
