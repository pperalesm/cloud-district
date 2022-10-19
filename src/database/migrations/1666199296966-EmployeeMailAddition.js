const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class EmployeeMailAddition1666199296966 {
  name = 'EmployeeMailAddition1666199296966';

  async up(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "coaches"
            ADD "email" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "players"
            ADD "email" character varying NOT NULL
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "players" DROP COLUMN "email"
        `);
    await queryRunner.query(`
            ALTER TABLE "coaches" DROP COLUMN "email"
        `);
  }
};
