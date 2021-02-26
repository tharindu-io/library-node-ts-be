import { expect } from 'chai';
import InvalidBookIdError from '../errors/book/invalid-book-id-error';
import BookId from './book-id';

describe('Book Id', () => {
    it('should return the same valid book id when get id is called', () => {
        const bookId = new BookId(123);
        expect(bookId.id).to.equal(123);
    });

    it('should return a number when get id is called', () => {
        const bookId = new BookId(123);
        expect(bookId.id).to.be.a('number');
    });

    it('should throw an invalid book id error when a invalid id is given', () => {
        expect(() => new BookId(null)).to.throw(InvalidBookIdError);
    });

    it('should throw a invalid book id error if passed in id is negative', () => {
        expect(() => new BookId(-10)).to.throw(InvalidBookIdError);
    });

    it('should throw invalid book id error when book id is undefined', () => {
        expect(() => new BookId(undefined)).to.throw(InvalidBookIdError);
    });

})