CREATE TABLE customers (
    id INTEGER NOT NULL PRIMARY KEY
);

CREATE TABLE books (
    id INTEGER NOT NULL PRIMARY KEY
);

CREATE TABLE customer_borrowal_statuses (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE customer_borrowals (
    customer_id INTEGER REFERENCES customers (id) NOT NULL,
    book_id INTEGER REFERENCES books (id) NOT NULL,
    borrowal_timestamp TIMESTAMPTZ NOT NULL,
    return_timestamp TIMESTAMPTZ,
    borrowal_status INTEGER REFERENCES customer_borrowal_statuses (id) NOT NULL,
    PRIMARY KEY (customer_id, book_id)
);