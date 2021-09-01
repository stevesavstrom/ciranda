const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * GET route for returning all companies
 */
router.get("/", (req, res) => {
  const query = `SELECT
  companies.*,
  ARRAY_AGG(distinct service_areas.area) AS areas,
  ARRAY_AGG(distinct recyclables.item) AS item
FROM companies
JOIN companies_recyclables ON companies_recyclables.company_id = companies.id
JOIN service_areas ON service_areas.company_id = companies.id
JOIN recyclables ON recyclables.id = companies_recyclables.recyclable_id
GROUP BY companies.id;`;
  pool
    .query(query)
    .then((dbRes) => {
      res.send(dbRes.rows);
    })
    .catch((err) => {
      console.log("Unable to return db data", err);
      res.sendStatus(500);
    });
});

/**
 * GET route to find by id
 */
router.get("/:id", (req, res) => {
    const companyId = req.params.id;
    const query = `SELECT
	companies.*,
	ARRAY_AGG(distinct service_areas.area) AS areas,
	ARRAY_AGG(distinct recyclables.item) AS item
FROM companies
JOIN companies_recyclables ON companies_recyclables.company_id = companies.id
JOIN service_areas ON service_areas.company_id = companies.id
JOIN recyclables ON recyclables.id = companies_recyclables.recyclable_id
WHERE companies.id = $1
GROUP BY companies.id;`;
pool.query(query, [companyId])
.then(dbRes => {
    res.send(dbRes.rows);
})
.catch(err => {
    console.log('Error returning by company by id', err);
    res.sendStatus(500);
})
});

router.post('/', (req,res) => {
    const newCompany = req.body;
    console.log('Whole req.body', req.body);
    const recyclableIds = req.body.recyclable_id;
    console.log(`recyclableIDs is `, req.body.recyclable_id);
    const serviceAreas = req.body.area;
    // const serviceAreas = req.body.serviceAreas;
    const newCompanyQuery = `INSERT INTO companies (name, service_range, website, 
    address, city, state, zip, phone, email, cleanliness, pickup_requirements, notes)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id;`;
    pool.query(newCompanyQuery, [newCompany.name, newCompany.service_range, newCompany.website,
    newCompany.address, newCompany.city, newCompany.state, newCompany.zip, newCompany.phone,
    newCompany.email, newCompany.cleanliness, newCompany.pickup_requirements, newCompany.notes])
    .then(dbRes => {
        console.log('The new company ID is: ', dbRes.rows[0].id);
        const newCompanyId = dbRes.rows[0].id;
        const matchingQuery = `INSERT INTO companies_recyclables (company_id, recyclable_id)
        VALUES ($1, $2);`;
        const areaQuery = `INSERT INTO service_areas (area, company_id)
        VALUES ($1, $2);`;
        for (const recyclable of recyclableIds) {
            pool.query(matchingQuery, [newCompanyId, recyclable])
            .catch(err => {
                console.log('Unable to post to companies_recyclables', err);
                res.sendStatus(500);
            });
        };
        for (const area of serviceAreas) {
            pool.query(areaQuery, [area, newCompanyId])
            .catch(err => {
                console.log('Unable to post to service_areas', err);
                res.sendStatus(500);
            });
        };
        res.sendStatus(200);
    })
    .catch(err => {
        console.log('unable to post new company', err);
        res.sendStatus(500);
    })
});

module.exports = router;
