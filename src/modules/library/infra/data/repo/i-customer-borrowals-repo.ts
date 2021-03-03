import { Result } from "typescript-result";
import CustomerBorrowal from "../entities/customer-borrowal";

export default interface ICustomerBorrowalsRepo {
    getBookLatestBorrowal(bookId: number): Promise<Result<Error, CustomerBorrowal | undefined>>;
    getActiveCustomerBorrowalsById(customerId: number): Promise<Result<Error, CustomerBorrowal[]>>;
    saveOrUpdateCustomerBorrowals(customerBorrowals: CustomerBorrowal[]): Promise<Result<Error, void>>;
}