import {MigrationInterface, QueryRunner} from "typeorm";

export class BorrowalStatuses1614677586715 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO public.customer_borrowal_statuses(id, name) VALUES
        (0, 'Borrowed'), 
        (1, 'Returned');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
