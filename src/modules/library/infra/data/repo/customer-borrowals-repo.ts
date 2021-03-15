import { getRepository, In } from 'typeorm';
import { Result } from 'typescript-result';
import CustomerBorrowal from '../entities/customer-borrowal';
import CustomerBorrowalReturnDto from './dto/customer-borrowal-return-dto';
import ICustomerBorrowalsRepo from './i-customer-borrowals-repo';
import BorrowalStatus from '../entities/borrowal-status';

export default class CustomerBorrowalsRepo implements ICustomerBorrowalsRepo {

    /**
     * get latet borrowal record for a book or else return undefined
     * @param bookId 
     */
    async getBookLatestBorrowal(bookId: number): Promise<Result<Error, CustomerBorrowal | undefined>> {
        try {
            // todo validations

            const customerBorrowal = await getRepository(CustomerBorrowal)
                .createQueryBuilder("c1")
                .innerJoin(qb => qb
                    .select("book_id")
                    .addSelect("MAX(borrowal_timestamp)", "max")
                    .from(CustomerBorrowal, "c2")
                    .groupBy("book_id"),
                    "c3",
                    "c3.book_id = c1.book_id")
                .where("c1.book_id = :bookId", { bookId: bookId })
                .getOne();

            return Result.ok(customerBorrowal);

        } catch (error) {
            return Result.error(error);
        }
    }

    /**
     * get active borrowal records (status -> borrowed) for a customer or else send an empty array
     * @param customerId 
     */
    async getActiveCustomerBorrowalsById(customerId: number): Promise<Result<Error, CustomerBorrowal[]>> {
        try {
            // todo validations

            const customerBorrowal = await getRepository(CustomerBorrowal)
                .createQueryBuilder("c1")
                .leftJoinAndSelect("c1.book", "book")
                .where("c1.customer_Id = :customerId", { customerId: customerId })
                .andWhere("c1.borrowal_status = :borrowalStatus", { borrowalStatus: 0 })
                .getMany();

            // TODO: Enum the borrowalStatus
            return Result.ok(customerBorrowal);

        } catch (error) {
            return Result.error(error);
        }
    }

    /**
     * save new customer borrowals. Done in a single transaction. this is to be used to create new customer borrowals only.
     * @param customerBorrowals 
     */
    async saveNewCustomerBorrowals(customerBorrowals: CustomerBorrowal[]): Promise<Result<Error, void>> {
        try {
            // todo validate object

            await getRepository(CustomerBorrowal).save(customerBorrowals);
            return Result.ok();

        } catch (error) {
            return Result.error(error);
        }
    }

    async saveCustomerBorrowalReturns(customerBorrowalReturnDto: CustomerBorrowalReturnDto): Promise<Result<Error, void>> {
        try {
            // todo validate dto

            await getRepository(CustomerBorrowal)
                .createQueryBuilder()
                .update(CustomerBorrowal)
                .set({
                    returnTimestamp: customerBorrowalReturnDto.returnTimestamp,
                    borrowalStatus: BorrowalStatus.Returned
                })
                .where({ id: In(customerBorrowalReturnDto.id) })
                .execute();
            
            return Result.ok();
            
        } catch (error) {
            return Result.error(error);
        }
    }
}