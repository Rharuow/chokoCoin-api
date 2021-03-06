import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnIsAdminToUser1639116323319 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "users",
      new TableColumn({
        name: "is_admin",
        type: "boolean",
        default: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "is_admin");
  }
}
