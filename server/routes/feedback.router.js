
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


// returns all feedback from db for display in the admin view
router.get('/', (req, res) => {
    const query = `
    SELECT feedback.company_id, companies.name AS company_name, feedback.customer, feedback.email, feedback.comment, feedback.date FROM feedback
    JOIN companies ON feedback.company_id = companies.id
    `;
    pool.query(query)
    .then( response => {
        res.send(response.rows);
    })
    .catch ( err => {
        console.log('Error getting feedback', err);
        res.sendStatus(500);
    })
});


// returns all recycler feedback from db for display in the admin view
router.get('/recycling_comments', (req, res) => {
    const query = `
    SELECT * FROM recycle_feedback ORDER BY date;`;
    pool.query(query)
    .then( response => {
        res.send(response.rows);
    })
    .catch ( err => {
        console.log('Error getting feedback', err);
        res.sendStatus(500);
    })
});



// adds new feedback to the database upon submission by a user. 
// these records are tied to the recycler id for which they are submitted.
router.post('/', (req, res) => {
    feedback = req.body;
    const query = `
    INSERT INTO feedback (company_id, customer, email, comment, date)
    VALUES ($1, $2, $3, $4, NOW());
    `;
    pool.query(query, [feedback.company_id, feedback.customer, feedback.email, feedback.comment])
    .then( response => {
        res.sendStatus(201);
    })
    .catch( err => {
        console.log('Error posting feedback record', err);
    })
});

// PUT feedback router
// This is a sample of what should be needed for the admin edit feedback.
router.put("/:id",  (req, res) => {
    const company_id = req.body.company_id;
    const customer = req.body.customer;
    const email = req.body.email;
    const comment = req.body.comment;
    const date = req.body.date;

    const queryText = `UPDATE "feedback"
    SET company_id=$1, customer=$2, email=$3, comment=$4, date=$5
    WHERE id=$6`;
	pool
	  .query(queryText, [req.body.company_id, req.body.customer, req.body.email, req.body.comment, req.body.date])
	  .then((result) => {
		console.log("Updated feedback confirm", result);
		res.sendStatus(201);
	  })
	  .catch((error) => {
		console.log(`PUT error: ${error}`);
		res.sendStatus(500);
	  });
  });


// DELETE feedback from the Feedback table
router.delete('/:id', (req, res) => {
    pool.query('DELETE FROM "feedback" WHERE id=$1', [req.params.id])
    .then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error DELETE /api/feedback', error);
        res.sendStatus(500);
    })
  });
  
module.exports = router;