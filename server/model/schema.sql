DROP TABLE IF EXISTS stock CASCADE;
DROP TABLE IF EXISTS update_record CASCADE;

CREATE TABLE stock (
    symbol VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    exchange VARCHAR(10) NOT NULL
);

CREATE TABLE update_record (
    update_date TIMESTAMP NOT NULL DEFAULT current_timestamp 
);