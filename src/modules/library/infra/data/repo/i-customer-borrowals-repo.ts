import { Result } from "typescript-result";
import CustomerBorrowal from "../entities/customer-borrowal";
import CustomerBorrowalReturnDto from "./dto/customer-borrowal-return-dto";

export default interface ICustomerBorrowalsRepo {
    getBookLatestBorrowal(bookId: number): Promise<Result<Error, CustomerBorrowal | undefined>>;
    getActiveCustomerBorrowalsById(customerId: number): Promise<Result<Error, CustomerBorrowal[]>>;
    saveNewCustomerBorrowals(customerBorrowals: CustomerBorrowal[]): Promise<Result<Error, void>>;
    saveCustomerBorrowalReturns(customerBorrowalReturnDto: CustomerBorrowalReturnDto): Promise<Result<Error, void>>;
}