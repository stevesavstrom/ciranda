-- Create a database called 'ciranda'

-- Drop tables (use this order to avoid dependency conflicts)
DROP TABLE "user";
DROP TABLE "feedback";
DROP TABLE "companies_recyclables";
DROP TABLE "recyclables";
DROP TABLE "service_areas";
DROP TABLE "companies";

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

CREATE TABLE "companies" (
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
    "item" TEXT
);

CREATE TABLE "companies_recyclables" (
    "id" SERIAL PRIMARY KEY,
    "company_id" INT REFERENCES "companies" ON DELETE CASCADE NOT NULL,
    "recyclable_id" INT REFERENCES "recyclables" ON DELETE CASCADE NOT NULL
);

-- Service area table
-- Insert entities one at a time
-- Possibly use CONUS (Continental U.S.) - boolean true/false for national companies. If false then insert individual states.

CREATE TABLE "service_areas" (
    "id" SERIAL PRIMARY KEY,
    "area" TEXT,
    "company_id" INT REFERENCES "companies"
);

CREATE TABLE "feedback" (
   "id" SERIAL PRIMARY KEY,
   "company_id" INT REFERENCES "companies",
   "customer" TEXT,
   "email" TEXT,
   "comment" TEXT,
   "date" DATE 
);

-- Placeholder Data Insert Statements
INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Greif', 'National', 'https://wwww.greif.com/', NULL, NULL, NULL, NULL, NULL, 'recyclingservices@greif.com', 'Triple rinsed, labels removed, contact for more details.', NULL, 'Fee for recycling IBCs, cost depends on freight and load density, call or email');

INSERT INTO "recyclables" ("item")
VALUES ('Metal Drums'), ('Plastic Drums HDPE'), ('LDPE Containers'), ('Plastic Film'), ('IBCs'), ('Cardboard');

INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (1, 5);

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Sample Company', 'Local', 'https://wwww.sample.com/', NULL, NULL, NULL, NULL, NULL, 'recyclingservices@greif.com', 'Triple rinsed, labels removed, contact for more details.', NULL, 'Fee for recycling IBCs, cost depends on freight and load density, call or email');

INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (2, 1), (2, 2), (2, 3), (2, 5);

INSERT INTO "service_areas" ("area", "company_id")
VALUES ('MN', 1), ('WI', 1);

INSERT INTO "service_areas" ("area", "company_id")
VALUES ('MN', 1), ('WI', 1);

INSERT INTO "service_areas" ("area", "company_id")
VALUES ('CA', 2), ('WA', 2), ('OR', 2);

-- Test Queries

-- GET all recycling centers from the recycling_centers table
SELECT
companies.id,
companies.name,
companies.service_range,
companies.website,
companies.address,
companies.city,
companies.state,
companies.zip,
companies.phone,
companies.email,
companies.cleanliness,
companies.pickup_requirements,
companies.notes,
companies_recyclables.recyclable_id,
service_areas.area
FROM companies
JOIN companies_recyclables ON companies_recyclables.company_id = companies.id
JOIN service_areas ON service_areas.company_id = companies.id
JOIN recyclables ON recyclables.id = companies_recyclables.recyclable_id;

