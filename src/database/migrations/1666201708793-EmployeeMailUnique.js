const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class EmployeeMailUnique1666201708793 {
  name = 'EmployeeMailUnique1666201708793';

  async up(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "coaches"
            ADD CONSTRAINT "UQ_769512c621f6d217ca32463e710" UNIQUE ("email")
        `);
    await queryRunner.query(`
            ALTER TABLE "players"
            ADD CONSTRAINT "UQ_3abeb86b19703d782f0beff84c0" UNIQUE ("email")
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            ALTER TABLE "players" DROP CONSTRAINT "UQ_3abeb86b19703d782f0beff84c0"
        `);
    await queryRunner.query(`
            ALTER TABLE "coaches" DROP CONSTRAINT "UQ_769512c621f6d217ca32463e710"
        `);
  }
};
