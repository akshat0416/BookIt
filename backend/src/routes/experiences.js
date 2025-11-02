const express = require('express');
const router = express.Router();
const db = require('../config/database');

// ✅ GET all experiences
router.get('/', async (req, res) => {
  try {
    console.log("✅ Request received at /api/experiences");

    const result = await db.query(`
      SELECT * FROM experiences WHERE is_active = true
    `);

    console.log("✅ Query successful, rows returned:", result.rows.length);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching experiences:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET experience by ID
router.get('/:id', async (req, res) => {
  try {
    console.log(`✅ Request received for /api/experiences/${req.params.id}`);

    const { id } = req.params;
    const result = await db.query(`
      SELECT * FROM experiences WHERE id = $1 AND is_active = true
    `, [id]);
    
    if (result.rows.length === 0) {
      console.warn(`⚠️ Experience with ID ${id} not found`);
      return res.status(404).json({ error: 'Experience not found' });
    }

    console.log("✅ Experience fetched successfully");
    res.json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error fetching experience by ID:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ GET available slots for experience
router.get('/:id/slots', async (req, res) => {
  try {
    console.log(`✅ Request received for /api/experiences/${req.params.id}/slots`);

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
    console.log(`✅ Slots fetched: ${result.rows.length}`);
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching slots:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
