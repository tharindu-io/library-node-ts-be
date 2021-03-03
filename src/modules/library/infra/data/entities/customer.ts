import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import CustomerBorrowal from "./customer-borrowal";

@Entity({ name: "customers" })
export default class Customer {

    @PrimaryColumn()
    id!: number;

    @Column({ name: "borrowal_limit" })
    borrowalLimit!: number;

    @OneToMany(() => CustomerBorrowal, customerBorrowal => customerBorrowal.customer)
    customerBorrowals!: CustomerBorrowal[];
}