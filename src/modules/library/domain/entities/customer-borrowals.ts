import BookAlreadyBorrowedError from "../errors/book/book-already-borrowed-error";
import BookNotBorrowedByCustomerError from "../errors/book/book-not-borrowed-by-customer-error";
import BookNotBorrowedError from "../errors/book/book-not-borrowed-error";
import BorrowalLimitError from "../errors/customer/borrowal-limit-error";
import CustomerIdError from "../errors/customer/customer-id-error";
import Book from "./book";
import Borrowal from "./borrowal";
import Customer from "./customer";

export default class CustomerBorrowals {
    
    private _customer: Customer;
    private _currentBorrowedBooks: Borrowal[];
    private _pendingBorrowals: Borrowal[];
    private _returningBorrowals: Borrowal[];

    constructor(customer: Customer, currentBorrowedBooks: Borrowal[]) {
        if (!customer) throw new CustomerIdError("Customer can't be null.");
        if (!currentBorrowedBooks) throw new CustomerIdError("Current borrowed books can't be null.");
        this._customer = customer;
        this._currentBorrowedBooks = currentBorrowedBooks;
        this._pendingBorrowals = [];
        this._returningBorrowals = [];
    }
    
    private canBorrow(): boolean {
        return this._customer.borrowalLimit > this._currentBorrowedBooks.length ? true : false;
    }

    public borrow(book: Book): BookAlreadyBorrowedError | BorrowalLimitError | void {

        // check if book is borrowed by another customer
        if (book.isBorrowed()) throw new BookAlreadyBorrowedError(`Book with id ${book.getId()} is already borrowed.`);

        // check if customer can borrow more books
        if (!this.canBorrow()) throw new BorrowalLimitError(`The customer with id ${this._customer.customerId} has borrowed upto the allowed limit.`);

        // check if book borrowal already exists in pending borrowals
        const bookBorrowal = new Borrowal(book.getId());

        if (this._pendingBorrowals.includes(bookBorrowal)) throw new BookAlreadyBorrowedError(`Book with id ${book.getId()} is already pending to be borrowed.`);

        // mark the book as borrowed
        book.markAsBorrowed();

        // add the book to borrow
        this._pendingBorrowals.push(bookBorrowal);
    }

    public return(book: Book): BookNotBorrowedError |  void {

        // check if book is borrowed
        if (!book.isBorrowed()) throw new BookNotBorrowedError(`Book with id ${book.getId()} is not already borrowed.`);

        // check if the book is borrowed by the current customer
        const bookIndex = this._currentBorrowedBooks.findIndex((bookElem: Borrowal) => bookElem.bookId == book.getId());
        if (bookIndex === -1) throw new BookNotBorrowedByCustomerError(`Book with id ${book.getId()} is not borrowed by current customer ${this._customer.customerId}.`);
        
        // TODO handle pending removal as well

        // remove book and keep it in returning borrowals
        this._returningBorrowals.push(this._currentBorrowedBooks.splice(bookIndex, 1)[0]);
    }

	public get pendingBorrowals(): Borrowal[] {
		return this._pendingBorrowals;
	}

}