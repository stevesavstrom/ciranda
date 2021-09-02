const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// returns all feedback from db for display in the admin view
router.get('/', (req, res) => {
    const query = `
    SELECT * FROM feedback;
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

module.exports = router;
