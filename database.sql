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
    "provider_area" TEXT,
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

-- Placeholder Data Insert Statements
INSERT INTO "recycling_companies" ("name", "website", "address", "provider_area", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Greif', 'https://wwww.greif.com/', NULL, NULL, NULL, 'recyclingservices@greif.com', 'Triple rinsed, labels removed, contact for more details.', NULL, 'National: Fee for recycling IBCs, cost depends on freight and load density, call or email');

INSERT INTO "recyclables" ("accepted_item")
VALUES ('Metal Drums'), ('Plastic Drums HDPE'), ('LDPE Containers'), ('Plastic Film'), ('IBCs'), ('Cardboard');

INSERT INTO "recycling_companies_recyclables" ("recycling_company_id", "recyclable_id")
VALUES (1, 5);

-- Fake company data - repreents a company that accepts multiple items
INSERT INTO "recycling_companies" ("name", "website", "address", "provider_area", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Fake Company', 'https://fake/', NULL, NULL, NULL, 'recyclingservices@fake.com', 'Triple rinsed, labels removed, contact for more details.', NULL, 'National: Fee for recycling IBCs, cost depends on freight and load density, call or email');

INSERT INTO "recycling_companies_recyclables" ("recycling_company_id", "recyclable_id")
VALUES (2, 1), (2, 2), (2, 3), (2, 5);

