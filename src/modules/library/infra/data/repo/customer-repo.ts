import { getRepository } from "typeorm";
import { Result } from "typescript-result";
import Customer from "../entities/customer";
import IGetByIdRepo from "./common/i-get-by-id-repo";

export default class CustomerRepo implements IGetByIdRepo<number, Customer> {

    async getById(id: number): Promise<Result<Error, Customer>> {
        try {
            const customer = await getRepository(Customer).findOne(id);
            return Result.ok(customer);
            
        } catch (error) {
            return Result.error(error);
        }
    }
    
}