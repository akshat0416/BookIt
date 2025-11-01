const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all experiences
router.get('/', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM experiences WHERE is_active = true
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET experience by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(`
      SELECT * FROM experiences WHERE id = $1 AND is_active = true
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET available slots for experience
router.get('/:id/slots', async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;
    
    let query = `
      SELECT * FROM slots 
      WHERE experience_id = $1 
      AND is_available = true 
      AND booked_count < max_capacity
      AND date >= CURRENT_DATE
    `;
    let params = [id];
    
    if (date) {
      query += ' AND date = $2';
      params.push(date);
    }
    
    query += ' ORDER BY date, start_time';
    
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;