-- Create a database called 'ciranda'

-- Drop tables (use this order to avoid dependency conflicts)
DROP TABLE "user";
DROP TABLE "feedback";
DROP TABLE "recycling_companies_recyclables";
DROP TABLE "recyclables";
DROP TABLE "service_area";
DROP TABLE "recycling_companies";

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
    "service_range" TEXT,
    "website" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zip" TEXT,
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

-- Service area table - feedback from Chad
-- Insert entities one at a time
-- Possibly use CONUS (Continental U.S.) - boolean true/false for national companies. If false then insert individual states.

CREATE TABLE "service_area" (
    "id" SERIAL PRIMARY KEY,
    "service_area" TEXT,
    "recycling_company_id" INT REFERENCES "recycling_companies"
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
INSERT INTO "recycling_companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Greif', 'National', 'https://wwww.greif.com/', NULL, NULL, NULL, NULL, NULL, 'recyclingservices@greif.com', 'Triple rinsed, labels removed, contact for more details.', NULL, 'Fee for recycling IBCs, cost depends on freight and load density, call or email');

INSERT INTO "recyclables" ("accepted_item")
VALUES ('Metal Drums'), ('Plastic Drums HDPE'), ('LDPE Containers'), ('Plastic Film'), ('IBCs'), ('Cardboard');

INSERT INTO "recycling_companies_recyclables" ("recycling_company_id", "recyclable_id")
VALUES (1, 5);

-- Fake company data - repreents a company that accepts multiple items
INSERT INTO "recycling_companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Sample Company', 'Local', 'https://wwww.sample.com/', NULL, NULL, NULL, NULL, NULL, 'recyclingservices@greif.com', 'Triple rinsed, labels removed, contact for more details.', NULL, 'Fee for recycling IBCs, cost depends on freight and load density, call or email');

INSERT INTO "recycling_companies_recyclables" ("recycling_company_id", "recyclable_id")
VALUES (2, 1), (2, 2), (2, 3), (2, 5);

INSERT INTO "service_area" ("service_area", "recycling_company_id")
VALUES ('MN', 1), ('WI', 1);

INSERT INTO "service_area" ("service_area", "recycling_company_id")
VALUES ('CA', 2), ('WA', 2), ('OR', 2);

