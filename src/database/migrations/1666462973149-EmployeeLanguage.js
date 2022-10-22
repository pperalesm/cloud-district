const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class EmployeeLanguage1666462973149 {
  name = 'EmployeeLanguage1666462973149';

  async up(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "coaches"
            ADD "language" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "players"
            ADD "language" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "coaches"
            ALTER COLUMN "salary" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "players"
            ALTER COLUMN "salary" DROP DEFAULT
        `);
    await queryRunner.query(`
            ALTER TABLE "clubs"
            ALTER COLUMN "budget" DROP DEFAULT
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "clubs"
            ALTER COLUMN "budget"
            SET DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "players"
            ALTER COLUMN "salary"
            SET DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "coaches"
            ALTER COLUMN "salary"
            SET DEFAULT '0'
        `);
    await queryRunner.query(`
            ALTER TABLE "players" DROP COLUMN "language"
        `);
    await queryRunner.query(`
            ALTER TABLE "coaches" DROP COLUMN "language"
        `);
  }
};
