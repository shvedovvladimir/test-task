import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1541914009027 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `create table test_task_user (
                "id" serial primary key,
                "login" varchar(255) not null,
                "password" varchar(255) not null,
                "deleteTime" timestamp with time zone,
                "createTime" timestamp with time zone not null DEFAULT NOW(),
                "updateTime" timestamp with time zone not null DEFAULT NOW(),

                UNIQUE("login")
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('drop table test_task_user');
  }
}
