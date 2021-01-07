import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddCollunmPlanToUsers1608229628527 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'plan',
      type: 'varchar',

    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'plan');
  }
}
