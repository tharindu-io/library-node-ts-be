-- CreateTable
CREATE TABLE "books" (
    "id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_borrowal_statuses" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_borrowals" (
    "customer_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "borrowal_timestamp" TIMESTAMPTZ(6) NOT NULL,
    "return_timestamp" TIMESTAMPTZ(6),
    "borrowal_status" INTEGER NOT NULL,

    PRIMARY KEY ("customer_id","book_id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_borrowals" ADD FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_borrowals" ADD FOREIGN KEY ("borrowal_status") REFERENCES "customer_borrowal_statuses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_borrowals" ADD FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
