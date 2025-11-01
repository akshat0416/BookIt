const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { validatePromo } = require('../middleware/validation');

router.post('/validate', validatePromo, async (req, res) => {
  try {
    const { code, amount } = req.body;
    
    const result = await db.query(`
      SELECT * FROM promo_codes 
      WHERE code = $1 AND is_active = true 
      AND (valid_until IS NULL OR valid_until >= CURRENT_DATE)
      AND (valid_from IS NULL OR valid_from <= CURRENT_DATE)
      AND (max_uses IS NULL OR used_count < max_uses)
      AND min_amount <= $2
    `, [code, amount]);

    if (result.rows.length === 0) {
      return res.json({ 
        valid: false, 
        error: 'Invalid or expired promo code' 
      });
    }

    const promo = result.rows[0];
    let discount_amount = 0;

    if (promo.discount_type === 'percentage') {
      discount_amount = amount * (promo.discount_value / 100);
    } else {
      discount_amount = Math.min(promo.discount_value, amount);
    }

    res.json({
      valid: true,
      discount_amount,
      discount_type: promo.discount_type
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;