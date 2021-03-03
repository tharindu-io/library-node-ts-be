import { Result } from 'typescript-result';

export default interface IGetByIdRepo<T , R> {
    getById(id: T): Promise<Result<Error, R>>;
}