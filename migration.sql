DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS employee;

DROP TABLE IF EXISTS vehicle;

CREATE TABLE customer
(
  id        SERIAL   PRIMARY KEY,
  firstName TEXT    ,
  lastName  TEXT    ,
  phone     char(10)
);

CREATE TABLE employee
(
  id        SERIAL   PRIMARY KEY,
  firstName TEXT    ,
  lastName  TEXT    ,
  phone     char(10)
);

CREATE TABLE vehicle
(
  id    SERIAL     PRIMARY KEY,
  make  TEXT      ,
  model TEXT      ,
  year  char(4)
);

CREATE TABLE sales
(
  id          SERIAL  PRIMARY KEY,
  employee_id INTEGER REFERENCES employee(id),
  customer_id INTEGER REFERENCES customer(id),
  vehicle_id  INTEGER REFERENCES vehicle(id), 
  price       MONEY
   
);

      