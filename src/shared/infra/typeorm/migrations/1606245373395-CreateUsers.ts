import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1606245373395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          generationStrategy: 'uuid',
          isPrimary: true,
          default: 'uuid_generate_v4()',

        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'login',
          type: 'varchar',

        },
        {
          name: 'cpf_cnpj',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'varchar',

        },
        {
          name: 'password',
          type: 'varchar',

        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },

      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
