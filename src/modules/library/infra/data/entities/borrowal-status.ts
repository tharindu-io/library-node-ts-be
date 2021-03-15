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

    public static get Borrowed(): BorrowalStatus {
        return this.returnWithStatus(0);
    }

    public static get Returned(): BorrowalStatus {
        return this.returnWithStatus(1);
    }

    private static returnWithStatus(state:number): BorrowalStatus {
        const borrowedStatus = new BorrowalStatus();
        borrowedStatus.id = state;
        return borrowedStatus;
    }

}