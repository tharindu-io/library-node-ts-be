import { expect } from 'chai';
import BookError from '../errors/book/book-error';
import InvalidBookIdError from '../errors/book/invalid-book-id-error';
import BookId from './book-id';
import InternalError from '../errors/internal-error';
import DomainError from '../errors/domain-error';

describe('Book Id', () => {
    it('should return the same valid book id when get id is called', () => {
        const bookId = new BookId("abc123");
        expect(bookId.id).to.equal("abc123");
    });

    it('should return a string when get id is called', () => {
        const bookId = new BookId("abc123");
        expect(bookId.id).to.be.a('string');
    });

    it('should throw an invalid book id error when a invalid id is given', () => {
        expect(() => new BookId("abc_123")).to.throw(InvalidBookIdError);
    });

    it('should throw a book error if passed in id is empty', () => {
        expect(() => new BookId('')).to.throw(BookError);
    });

    it('should return an invalid book if error when character limit exceeds 15', () => {
        expect(() => new BookId('1234567890123456')).to.throw(InvalidBookIdError);
    });

    it('should throw an instance of a internal error when book id is passed as empty', () => {
        expect(() => new BookId('')).to.throw(InternalError);
    })

    it('should throw an instance of domain error when invalid id is given', () => {
        expect(() => new BookId("abc#123")).to.throw(DomainError);
    })

})