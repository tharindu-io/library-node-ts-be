import BookAlreadyBorrowedError from "../errors/book/book-already-borrowed-error";
import BookNotBorrowedByCustomerError from "../errors/book/book-not-borrowed-by-customer-error";
import BookNotBorrowedError from "../errors/book/book-not-borrowed-error";
import BorrowalLimitError from "../errors/customer/borrowal-limit-error";
import CustomerIdError from "../errors/customer/customer-id-error";
import Book from "./book";
import Customer from "./customer";

export default class CustomerBorrowals {
    
    private _customer: Customer;
    private _currentBorrowedBooks: Book[];

    constructor(customer: Customer, currentBorrowedBooks: Book[]) {
        if (!customer) throw new CustomerIdError("Customer can't be null.");
        if (!currentBorrowedBooks) throw new CustomerIdError("Current borrowed books can't be null.");
        this._customer = customer;
        this._currentBorrowedBooks = currentBorrowedBooks;
    }
    
    private canBorrow(): boolean {
        return this._customer.borrowalLimit() > this._currentBorrowedBooks.length ? true : false;
    }

    public borrow(book: Book): BookAlreadyBorrowedError | BorrowalLimitError | void {

        // check if book is borrowed by another customer
        if (book.isBorrowed()) throw new BookAlreadyBorrowedError(`Book with id ${book.getId()} is already borrowed.`);

        // check if customer can borrow more books
        if (!this.canBorrow()) throw new BorrowalLimitError(`The customer with id ${this._customer.customerId()} has borrowed upto the allowed limit.`);

        // check if book already exists in pending borrowals
        if (this._currentBorrowedBooks.includes(book)) throw new BookAlreadyBorrowedError(`Book with id ${book.getId()} is already pending to be borrowed.`);

        // mark the book as borrowed
        book.markAsBorrowed();

        // add the book to borrow
        this._currentBorrowedBooks.push(book);
    }

    public return(book: Book): BookNotBorrowedError |  void {

        // check if book is borrowed
        if (!book.isBorrowed()) throw new BookNotBorrowedError(`Book with id ${book.getId()} is not already borrowed.`);

        // check if the book is borrowed by the current customer
        const bookIndex = this._currentBorrowedBooks.findIndex((bookElem: Book) => bookElem.getId() == book.getId());
        if (bookIndex === -1) throw new BookNotBorrowedByCustomerError(`Book with id ${book.getId()} is not borrowed by current customer ${this._customer.customerId()}.`);
        
        // remove book
        this._currentBorrowedBooks.splice(bookIndex, 1);
    }
}