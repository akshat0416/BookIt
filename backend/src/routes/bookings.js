const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { validateBooking } = require('../middleware/validation');

// POST create booking
router.post('/', validateBooking, async (req, res) => {
  const client = await db.connect();
  
  try {
    await client.query('BEGIN');
    
    const {
      experience_id,
      slot_id,
      customer_name,
      customer_email,
      quantity,
      promo_code
    } = req.body;

    // Check slot availability
    const slotResult = await client.query(`
      SELECT * FROM slots 
      WHERE id = $1 AND experience_id = $2 
      AND is_available = true 
      AND (booked_count + $3) <= max_capacity
      FOR UPDATE
    `, [slot_id, experience_id, quantity]);

    if (slotResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Slot not available or capacity exceeded' });
    }

    const slot = slotResult.rows[0];
    const experienceResult = await client.query(
      'SELECT * FROM experiences WHERE id = $1',
      [experience_id]
    );
    
    if (experienceResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Experience not found' });
    }

    const experience = experienceResult.rows[0];

    // Calculate pricing
    let subtotal = experience.base_price * quantity;
    let discount_amount = 0;

    // Apply promo code if provided
    if (promo_code) {
      const promoResult = await client.query(`
        SELECT * FROM promo_codes 
        WHERE code = $1 AND is_active = true 
        AND (valid_until IS NULL OR valid_until >= CURRENT_DATE)
        AND (valid_from IS NULL OR valid_from <= CURRENT_DATE)
        AND (max_uses IS NULL OR used_count < max_uses)
      `, [promo_code]);

      if (promoResult.rows.length > 0) {
        const promo = promoResult.rows[0];
        if (subtotal >= promo.min_amount) {
          if (promo.discount_type === 'percentage') {
            discount_amount = subtotal * (promo.discount_value / 100);
          } else {
            discount_amount = Math.min(promo.discount_value, subtotal);
          }
          // Update promo code usage
          await client.query(
            'UPDATE promo_codes SET used_count = used_count + 1 WHERE id = $1',
            [promo.id]
          );
        }
      }
    }

    const tax_rate = 0.06; // 6% tax
    const tax_amount = (subtotal - discount_amount) * tax_rate;
    const total_amount = subtotal - discount_amount + tax_amount;

    // Generate reference ID
    const ref_id = `BKT${Date.now()}${Math.random().toString(36).substr(2, 3).toUpperCase()}`;

    // Create booking
    const bookingResult = await client.query(`
      INSERT INTO bookings (
        ref_id, experience_id, slot_id, customer_name, customer_email,
        quantity, subtotal, tax_amount, total_amount, promo_code, discount_amount
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      ref_id, experience_id, slot_id, customer_name, customer_email,
      quantity, subtotal, tax_amount, total_amount, promo_code, discount_amount
    ]);

    // Update slot booked count
    await client.query(`
      UPDATE slots SET booked_count = booked_count + $1 WHERE id = $2
    `, [quantity, slot_id]);

    await client.query('COMMIT');
    
    res.status(201).json({
      success: true,
      booking: bookingResult.rows[0]
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Internal server error during booking' });
  } finally {
    client.release();
  }
});

module.exports = router;