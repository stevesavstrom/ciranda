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
 * GET route using query params to search for companies that match
 */
router.get("/search?", (req, res) => {
    // trueMaterials is populated with all materials = 'true' from req.query
    const trueMaterials = []
    // loop through req.query and push materials to trueMaterials
    for (const material in req.query){
        if (req.query[material] == 'true'){
            switch (material) {
                case 'metalDrums':
                    trueMaterials.push('Metal Drums')
                    break;
                case 'plasticDrums':
                    trueMaterials.push('Plastic Drums HDPE')
                    break;
                case 'plasticFilm':
                    trueMaterials.push('Plastic Film')
                    break;
                case 'cardboard':
                    trueMaterials.push('Cardboard')
                    break;
                case 'ibcs':
                    trueMaterials.push('IBCs')
                    break; 
                case 'ldpe':
                    trueMaterials.push('LDPE Containers')
                    break;        
                default:
                    break;
            }
        }
    }
    let blingCounter = 2
    // materialString will be added to the end of WHERE statement in queryText
    let materialString = ` AND ( `
    if (trueMaterials == 0){
        materialString = ''
    }
    for (let i=0; i<trueMaterials.length; i++){
        if (trueMaterials.length === 1){
            materialString += `recyclables.item = $${blingCounter})`
        } else if (i === 0 && trueMaterials.length > 1){
            materialString += `recyclables.item = $${blingCounter}`
        } else if (i > 0){
            materialString += ` OR recyclables.item = $${blingCounter}`
            if (i === trueMaterials.length - 1){
                materialString += ` )`
            }
        }
        blingCounter ++
    }

    const queryText = (`
        SELECT
            companies.*,
            ARRAY_AGG(distinct service_areas.area) AS areas,
            ARRAY_AGG(distinct recyclables.item) AS item
        FROM companies
        JOIN companies_recyclables ON companies_recyclables.company_id = companies.id
        JOIN service_areas ON service_areas.company_id = companies.id
        JOIN recyclables ON recyclables.id = companies_recyclables.recyclable_id
        WHERE service_areas.area=$1 ${materialString}
        GROUP BY companies.id;`
    );
    console.log(queryText);
    trueMaterials.unshift(req.query.state)
    console.log(trueMaterials);
    pool.query(queryText, trueMaterials)
    .then(results => {
        res.send(results.rows)
    }).catch(error => {
        res.sendStatus(500);
        console.log(error);
    });
})

/**
 * GET route to find by id
 */
router.get("/:id", (req, res) => {
    console.log('Inside router.get by ID, the req.body is:', req.body);
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

// DELETE a recycling center record from the recycling_centers table
router.delete('/:id', (req, res) => {
  pool.query('DELETE FROM "companies" WHERE id=$1', [req.params.id])
  .then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log('Error DELETE /api/location', error);
      res.sendStatus(500);
  })
});

// POST a recycling center record
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

// PUT to edit recycling center record
router.put("/:id", async (req, res) => {
    
    const editCompany = req.body;

    let deleteRecyclables = `DELETE FROM "companies_recyclables" WHERE "company_id" = ${req.params.id};`;
    const insertRecyclables = `INSERT INTO "companies_recyclables" ("company_id", "recyclable_id")
                                VALUES (${req.params.id}, $1);`
    ;
    let deleteAreas = `DELETE FROM "service_areas" WHERE "company_id" = ${req.params.id};`
    const insertAreas = `INSERT INTO "service_areas" ("area", "company_id")
                                VALUES ($1, ${req.params.id});`
    ;

    const companyQueryParams = [editCompany.name, editCompany.service_range, editCompany.website,
        editCompany.address, editCompany.city, editCompany.state, editCompany.zip, editCompany.phone,
        editCompany.email, editCompany.cleanliness, editCompany.pickup_requirements, editCompany.notes, req.params.id]

    const companyQuery = 
    `UPDATE companies 
    SET name = $1,
    service_range = $2,
    website = $3,
    address = $4,
    city = $5,
    state = $6,
    zip = $7,
    phone = $8,
    email = $9,
    cleanliness = $10,
    pickup_requirements = $11,
    notes = $12
    WHERE companies.id = $13;`;

    try{
    await pool.query('BEGIN;');
    await pool.query(companyQuery, companyQueryParams);
    await pool.query(deleteRecyclables);
    for (const recyclable of req.body.recyclable_id){
        await pool.query(insertRecyclables, [recyclable])
    }
    await pool.query(deleteAreas);
    for (const area of req.body.area){
        await pool.query(insertAreas, [area])
    }
    await pool.query('COMMIT')
    .then(result => {
        console.log("successfully edited company", result);
        res.sendStatus(201);
    })
    .catch(err => {
        console.log('unable to edit company', err);
        res.sendStatus(500);
    })

    } catch (error) {
        await pool.query('ROLLBACK')
        throw error;
    }
})



module.exports = router;