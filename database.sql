-- Create a database called 'ciranda'

-- Drop tables
DROP TABLE "user";
DROP TABLE "recycling_companies";
DROP TABLE "recyclables";
DROP TABLE "recycling_companies_recyclables";
DROP TABLE "feedback";

-- Create the following tables in Postico

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "employee_name" TEXT,
    "email" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "recycling_companies" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "website" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "cleanliness" TEXT,
    "pickup_requirements" TEXT,
    "notes" TEXT
);

CREATE TABLE "recyclables" (
    "id" SERIAL PRIMARY KEY,
    "accepted_item" TEXT
);

CREATE TABLE "recycling_companies_recyclables" (
    "id" SERIAL PRIMARY KEY,
    "recycling_company_id" INT REFERENCES "recycling_companies" ON DELETE CASCADE NOT NULL,
    "recyclable_id" INT REFERENCES "recyclables" ON DELETE CASCADE NOT NULL
);

CREATE TABLE "feedback" (
   "id" SERIAL PRIMARY KEY,
   "recycling_company_id" INT REFERENCES "recycling_companies",
   "customer" TEXT,
   "email" TEXT,
   "comment" TEXT,
   "date" DATE 
);

