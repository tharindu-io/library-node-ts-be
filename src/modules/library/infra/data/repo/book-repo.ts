import { getRepository } from "typeorm";
import { Result } from "typescript-result";
import Book from "../entities/book";
import IGetByIdRepo from "./common/i-get-by-id-repo";

export default class BookRepo implements IGetByIdRepo<number, Book | undefined> {
    async getById(id: number): Promise<Result<Error, Book>> {
        try {
            const book = await getRepository(Book).findOne(id);
            return Result.ok(book);
            
        } catch (error) {
            return Result.error(error);
        }
    }
}