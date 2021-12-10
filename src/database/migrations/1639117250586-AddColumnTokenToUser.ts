import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnTokenToUser1639117250586 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({
                name: 'token',
                type: 'varchar',
                isUnique: true
            }),
            new TableColumn({
                name: 'isActive',
                type: 'boolean',
                isNullable: false,
                default: false
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('users', ['token', 'isActive'])
    }

}
