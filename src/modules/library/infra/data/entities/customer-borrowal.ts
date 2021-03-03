
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BorrowalStatus from "./borrowal-status";
import Book from './book';
import Customer from "./customer";

@Entity({ name: "customer_borrowals" })
export default class CustomerBorrowal {

    @PrimaryGeneratedColumn()
    id!: number;

    @JoinColumn({ name: "customer_id" })
    @ManyToOne(type => Customer, customer => customer.customerBorrowals, { primary: false, nullable: false })
    customer!: Customer;
    
    @JoinColumn({ name: "book_id" })
    @ManyToOne(type => Book, book => book.customerBorrowals, { primary: false, nullable: false })
    book!: Book;

    @Column()
    borrowal_timestamp!: Date;

    @Column()
    return_timestamp!: Date;

    @JoinColumn({ name: "borrowal_status" })
    @ManyToOne(type => BorrowalStatus, borrowalStatus => borrowalStatus.customerBorrowals)
    borrowalStatus!: BorrowalStatus;
}