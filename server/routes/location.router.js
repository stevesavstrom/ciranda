const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {rejectUnauthenticated} = require("../modules/authentication-middleware");

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
router.get("/search?", async (req, res) => { 
    try{
        console.log('IN SEARCH', req.query)
        // trueMaterials is populated with all materials = 'true' from req.query
        const trueMaterials = []
        // loop through req.query and push materials to trueMaterials.  Use switch to replace query name with database name.
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
        // bling counter used to adjust queryText based on the amount of materials selected for search
        let blingCounter = 2
        // materialString will be assembled with a for loop and added to the end of WHERE statement in queryText
        let materialString = ` AND ( `
        // if the array is empty, replace the material string with empty string so it doesn't affect the query.
        if (trueMaterials.length == 0){
            materialString = ''
        }
        // loop through trueMaterials array and add to the materialString.  Creates a dynamic string that changes based on the materials selected to search.
        for (let i=0; i<trueMaterials.length; i++){
            // if there's only one material then finish the WHERE query
            if (trueMaterials.length === 1){
                materialString += `recyclables.item = $${blingCounter})`
                // if there is more than one material in the array, start the string but don't close it off like if statement.
            } else if (i === 0 && trueMaterials.length > 1){
                materialString += `recyclables.item = $${blingCounter}`
                // if the material is in the middle, include an OR statement
            } else if (i > 0){
                materialString += ` OR recyclables.item = $${blingCounter}`
                // if this is the last material in the array, close off the string.
                if (i === trueMaterials.length - 1){
                    materialString += ` )`
                }
            }
            blingCounter ++
        }
        // queryText will return all company ids that match the location and selected materials
        const queryText = (`
            SELECT
                companies.id
            FROM companies
            JOIN companies_recyclables ON companies_recyclables.company_id = companies.id
            JOIN service_areas ON service_areas.company_id = companies.id
            JOIN recyclables ON recyclables.id = companies_recyclables.recyclable_id
            WHERE (companies.service_range = 'National' OR service_areas.area=$1) ${materialString}
            GROUP BY companies.id;`
        );
        // Add the state to the trueMaterials array, the array will then be used for the pool.query
        trueMaterials.unshift(req.query.state || null)
        // Creates a variable of the returned array from queryText and trueMaterials - this will be used to gather information on all companies
        const companiesList = await pool.query(queryText, trueMaterials)
        // Blank array that will hold further query info - this array is eventually sent as the complete array
        const returningCompanies = []
        // Second query - This query gathers all the relevant information we want to display for a specific company
        const secondaryQuery = `SELECT
                                    companies.*,
                                    ARRAY_AGG(distinct service_areas.area) AS areas,
                                    ARRAY_AGG(distinct recyclables.item) AS item
                                FROM companies
                                JOIN companies_recyclables ON companies_recyclables.company_id = companies.id
                                JOIN service_areas ON service_areas.company_id = companies.id
                                JOIN recyclables ON recyclables.id = companies_recyclables.recyclable_id
                                WHERE companies.id=$1
                                GROUP BY companies.id;`
        // Loop through the companyList of ids, run a query to get all company details, then push those details to the returningCompanies array.
        for (const company of companiesList.rows){
            const companyDetails = await pool.query(secondaryQuery, [company.id])
            returningCompanies.push(companyDetails.rows[0])
        }
        // Send the returningCompanies details array to the client.
        res.send(returningCompanies)
    } catch (error) {
        throw error;
    }
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
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  pool.query('DELETE FROM "companies" WHERE id=$1', [req.params.id])
  .then((result) => {
      res.sendStatus(200);
  }).catch((error) => {
      console.log('Error DELETE /api/location', error);
      res.sendStatus(500);
  })
});

// POST a recycling center record
router.post('/', rejectUnauthenticated, (req,res) => {
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
router.put("/:id", rejectUnauthenticated, async (req, res) => {
    
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
    res.sendStatus(201);
    
    } catch (error) {
        await pool.query('ROLLBACK')
        throw error;
    }
})



module.exports = router;