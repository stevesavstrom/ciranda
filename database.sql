-- Create a PostgreSQL database called 'ciranda'

-- Drop tables (use this order to avoid dependency conflicts)
DROP TABLE "user";
DROP TABLE "feedback";
DROP TABLE "companies_recyclables";
DROP TABLE "recyclables";
DROP TABLE "service_areas";
DROP TABLE "companies";
DROP TABLE "recycle_feedback";

-- Create the following tables in Postico

-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" TEXT UNIQUE,
    "email" VARCHAR (80) NOT NULL,
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

CREATE TABLE "service_areas" (
    "id" SERIAL PRIMARY KEY,
    "area" TEXT,
    "company_id" INT REFERENCES "companies" ON DELETE CASCADE,
);

CREATE TABLE "feedback" (
   "id" SERIAL PRIMARY KEY,
   "company_id" INT REFERENCES "companies" ON DELETE CASCADE,
   "name" TEXT,
   "customer" TEXT,
   "email" TEXT,
   "comment" TEXT,
   "date" TIMESTAMP 
);

CREATE TABLE "recycle_feedback" (
   "id" SERIAL PRIMARY KEY,
   "name" TEXT,
   "company" TEXT,
   "email" TEXT,
   "comment" TEXT,
   "date" TIMESTAMP 
);

-- *** START Sample Data Insert Statements *** --

-- RECYCLABLES
INSERT INTO "recyclables" ("item")
VALUES ('Metal Drums'), ('Plastic Drums HDPE'), ('LDPE Containers'), ('Plastic Film'), ('IBCs'), ('Cardboard');

-- COMPANIES
INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Recycle Logistics', 'Local', 'www.recyclelogistics.com', '1234 1st St.', 'Madison', 'WI', '53558', '608-455-0099', 'info@recyclelogistics.com', 'Single wash, no stickers', 'Pickup only', 'Fee for recycling drums, minimum weight 200lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Eureka Recycling', 'Local', 'www.eurekrecycling.com', '1234 2nd St.', 'Minneapolis', 'MN', '53558', '651-455-0099', 'recyclingservices@eurekarecycling.com', 'Single wash, no stickers', 'Drop off or pick up', 'Fee for recycling drums, minimum weight 200lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Atomic Recycling', 'Local', 'www.atomicrecycling.com', '555 5th St.', 'St. Paul', 'MN', '53558', '651-455-0078', 'recyclingservices@atomicrecycling.com', 'Pressure washed, no stickers', 'Drop off or pick up', 'Fee for recycling plastic and metal drums, minimum weight 500lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Como Recycling', 'Local', 'www.comorecycling.com', '444 4th St.', 'St. Paul', 'MN', '53558', '651-433-0078', 'recyclingservices@comorecycling.com', 'Spray washed, no stickers', 'Drop off or pick up locally', 'Minimum weight 100lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Prime Recycling', 'Local', 'www.primerecycling.com', '333 3rd St.', 'Brooklyn Park', 'MN', '55432', '651-433-1178', 'recyclingservices@primerecycling.com', 'Spray washed, no stickers or tags', 'Drop off or pick up locally', 'Minimum weight 250lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Junker Recycling', 'Local', 'www.junkerrecycling.com', '222 2nd St.', 'Stillwater', 'MN', '55082', '651-422-0031', 'recyclingservices@junkerrecycling.com', 'Single washed, no stickers or tags', 'Drop off or pick up locally', 'Minimum weight 50lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Express Recycling', 'Local', 'www.expressrecycling.com', '4455 3rd St.', 'Hudson', 'MN', '54016', '612-432-0191', 'recyclingservices@expressrecycling.com', 'Single washed, no stickers or tags', 'Drop off or pick up locally', 'Minimum weight 50lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('React Recycling', 'Local', 'www.reactrecycling.com', '4455 3rd St.', 'Menonomie', 'MN', '54011', '612-433-9041', 'recyclingservices@reactrecycling.com', 'Washed, no stickers or tags', 'Drop off or pick up locally', 'Minimum weight 200lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Green Recycling', 'Local', 'www.greenrecycling.com', '888 8th St.', 'Houlton', 'WI', '54012', '612-233-9041', 'recyclingservices@reactrecycling.com', 'Spray washed, no stickers or tags', 'Drop off or pick up locally', 'Minimum weight 300lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('GreenWorld Recycling', 'National', 'www.greenrecycling.com', '444 4th St.', 'Chicago', 'IL', '54012', '777-233-9041', 'recyclingservices@greenworldrecycling.com', 'Spray washed, no stickers or tags', 'Pick up nationally', 'Minimum weight 1000lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Bootstrap Recycling', 'National', 'www.bootstraprecycling.com', '3388 4th St.', 'Los Angeles', 'CA', '90210', '345-133-9041', 'recyclingservices@bootstraprecycling.com', 'Spray washed, no stickers or tags', 'Pick up nationally', 'Minimum weight 500lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('Eco-Recycle Partners Limited', 'National', 'www.ecorecycling.com', '4067 9th St.', 'Denver', 'CO', '80014', '345-133-9041', 'recyclingservices@ecorecycling.com', 'Any condition', 'Pick up nationally', 'Minimum weight 300lbs');

INSERT INTO "companies" ("name", "service_range", "website", "address", "city", "state", "zip", "phone", "email", "cleanliness", "pickup_requirements", "notes")
VALUES ('TerraCycle', 'National', 'www.terracycle.com', '3309 Brooks St.', 'Houston', 'TC', '77001', '281-209-0013', 'info@www.terracycle.com', 'Any condition', 'Pick up nationally', 'Minimum weight 300lbs');

-- COMPANIES_RECYCLABES
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (1, 1), (1, 3), (1, 4), (1, 5);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (2, 1), (2, 2), (2, 3), (2, 4), (2, 5);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (3, 1), (3, 2), (3, 3), (3, 4), (3, 5), (3, 6);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (4, 1), (4, 2), (4, 3), (4, 5), (4, 6);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (5, 2), (5, 3), (5, 5);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (6, 1), (6, 3), (6, 5);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (7, 1), (7, 3), (7, 4), (7, 5);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (8, 1), (8, 2), (8, 3), (8, 4), (8, 5);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (9, 2), (9, 3), (9, 4), (9, 5);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (10, 1), (10, 2), (10, 3), (10, 4), (10, 5), (10, 6);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (11, 1), (11, 2), (11, 3), (11, 4), (11, 5), (11, 6);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (12, 1), (12, 2), (12, 3), (12, 4), (12, 5), (12, 6);
INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
VALUES (13, 1), (13, 2), (13, 3), (13, 4), (13, 5), (13, 6);

-- SERVICE_AREAS
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('WI', 1), ('MN', 1), ('IL', 1);
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('WI', 2), ('MN', 2), ('IL', 2);
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('WI', 3), ('MN', 3), ('SD', 2), ('IA', 2);
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('WI', 4), ('MN', 4), ('IL', 4), ('IA', 4);
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('WI', 5), ('MN', 5);
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('MN', 6);
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('MN', 7), ('WI', 7);
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('MN', 8), ('WI', 8);
INSERT INTO "service_areas" ("area", "company_id")
VALUES ('MN', 9), ('WI', 9);

-- COMPANY FEEDBACK
INSERT INTO "feedback" ("company_id", "name", "customer", "email", "comment", "date")
VALUES ('1', 'Benji', 'Eastside Co-op', 'inventory@eastside.com', 'Address is incorrect - company has relocated', '09-12-2021');

INSERT INTO "feedback" ("company_id", "name", "customer", "email", "comment", "date")
VALUES ('1', 'Meghan', 'Seward Co-op', 'inventory@seward.com', 'No longer accepts cardboard', '09-12-2021');

INSERT INTO "feedback" ("company_id", "name", "customer", "email", "comment", "date")
VALUES ('1', 'Kash', 'General Mills', 'purchasing@generalmills.com', 'Will not take cardboard anymore.', '09-12-2021');

INSERT INTO "feedback" ("company_id", "name", "customer", "email", "comment", "date")
VALUES ('2', 'Joshua', 'Awesome Organics', 'inventory@awesomeorganics.com', 'Only open Monday, Tuesday, and Wednesday.', '09-12-2021');

-- RECYCLING FEEDBACK
INSERT INTO "recycle_feedback" ("name", "company", "email", "comment")
VALUES ('Chad Smith', 'Awesome Organics', 'chad@awesomeorganics.com', 'This month I recycled 25 metal drums and 12 plastic drums at my local recycling center');

INSERT INTO "recycle_feedback" ("name", "company", "email", "comment")
VALUES ('Steve Brooks', 'Alive & Radiant Foods', 'steve@aliveandradiant.com', 'This month I recycled 12 metal drums and 20 plastic drums at my local recycling center');

INSERT INTO "recycle_feedback" ("name", "company", "email", "comment")
VALUES ('Amy Larson', 'Bakery on Main, Inc.', 'amy@bakeryonmain.com', 'I have recycled 1500 pounds of cardboard so far in 2021.');

INSERT INTO "recycle_feedback" ("name", "company", "email", "comment")
VALUES ('Jim Martin', 'Raw Miracle Foods', 'jim@rawmiracle.com', 'I finally found a relible way to dispose of 10-20 IBCs per year. Happy to find a sustainable solution.');

INSERT INTO "recycle_feedback" ("name", "company", "email", "comment")
VALUES ('Kelsey Williams', 'Central Market', 'kelsey@centralmarket.com', 'I have been recycling 10 plastic drums and 2 IBCs per month on average. Glad to have this resource available!');

INSERT INTO "recycle_feedback" ("name", "company", "email", "comment")
VALUES ('Kong Yang', 'Crunchies Foods', 'kong@crunchies.com', 'I recycle 500 pounds of cardboard every month lately. This database is nice to have. I found two reliable recycling companies in my area.');

INSERT INTO "recycle_feedback" ("name", "company", "email", "comment")
VALUES ('John Idso', 'Avocado Everything', 'john@avocadoeverything.com', 'I recycle 10-15 avocado oil drums each quarter.');

-- *** END Sample Data Insert Statements *** --

-- Test Queries

-- GET all companies - Array_Agg Example to group items and areas
SELECT
	companies.*,
	ARRAY_AGG(distinct service_areas.area) AS areas,
	ARRAY_AGG(distinct recyclables.item) AS item
FROM companies
JOIN companies_recyclables ON companies_recyclables.company_id = companies.id
JOIN service_areas ON service_areas.company_id = companies.id
JOIN recyclables ON recyclables.id = companies_recyclables.recyclable_id
GROUP BY companies.id;

-- GET company by id - Array_Agg Example to group items and areas
SELECT
	companies.*,
	ARRAY_AGG(distinct service_areas.area) AS areas,
	ARRAY_AGG(distinct recyclables.item) AS item
FROM companies
JOIN companies_recyclables ON companies_recyclables.company_id = companies.id
JOIN service_areas ON service_areas.company_id = companies.id
JOIN recyclables ON recyclables.id = companies_recyclables.recyclable_id
WHERE companies.id = 2
GROUP BY companies.id;

-- POST route for add new company object (postman testing)
{
    "name": "Test Company Post",
    "service_range": "Regional",
    "website": "http://test",
    "address": "123 Test",
    "city": "st paul",
    "state": "MN",
    "zip": "55104",
    "phone": "651-something",
    "email": "email@test.com",
    "cleanliness": "clean it",
    "pickup_requirements": "we will pick up",
    "notes": "call us",
    "recyclable_id": [1,2],
    "area": ["MN", "WI", "IA"]
}

-- PUT route for feedback edit
{
    "company_id": "Company 13"
    "customer": "Steve"
    "email": "steve@food.com"
    "comment": "Easy to find"
    "date": "NOW"
}