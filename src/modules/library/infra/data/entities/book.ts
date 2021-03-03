import { Entity, OneToMany, PrimaryColumn } from 'typeorm';
import CustomerBorrowal from './customer-borrowal';

@Entity({ name: "books" })
export default class Book {

    @PrimaryColumn()
    id!: number;

    @OneToMany(() => CustomerBorrowal, customerBorrowal => customerBorrowal.book)
    customerBorrowals!: CustomerBorrowal[];
}