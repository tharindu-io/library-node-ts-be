import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseStructure1614673918629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE customers (
            id INTEGER NOT NULL PRIMARY KEY,
            borrowal_limit INTEGER NOT NULL
        );
        
        CREATE TABLE books (
            id INTEGER NOT NULL PRIMARY KEY
        );
        
        CREATE TABLE customer_borrowal_statuses (
            id INTEGER NOT NULL PRIMARY KEY,
            name VARCHAR(50) NOT NULL
        );
        
        CREATE TABLE customer_borrowals (
            id SERIAL NOT NULL PRIMARY KEY,
            customer_id INTEGER REFERENCES customers (id) NOT NULL,
            book_id INTEGER REFERENCES books (id) NOT NULL,
            borrowal_timestamp TIMESTAMPTZ NOT NULL,
            return_timestamp TIMESTAMPTZ,
            borrowal_status INTEGER REFERENCES customer_borrowal_statuses (id) NOT NULL
        );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
