import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserToPost1638457692142 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users_to_projects",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "value",
            type: "varchar",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "project_id",
            type: "uuid",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserToProjects",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
          {
            name: "FKProjectToUsers",
            columnNames: ["project_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "projects",
            onDelete: "CASCADE",
            onUpdate: "SET NULL",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users_to_projects");
  }
}
