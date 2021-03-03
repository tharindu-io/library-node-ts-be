import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import CustomerBorrowal from "./customer-borrowal";

@Entity({ name: "borrowal_statuses" })
export default class BorrowalStatus {
    
    @PrimaryColumn()
    id!: number;

    @Column()
    name!: string;
    
    @OneToMany(() => CustomerBorrowal, customerBorrowal => customerBorrowal.borrowalStatus)
    customerBorrowals!: CustomerBorrowal[];

    // TODO: may want to think about if there is a better place to hold this
    public isBorrowed(): boolean {
        return (this.id == 0)? true : false;
    }
}