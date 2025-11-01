const Joi = require('joi');

const bookingSchema = Joi.object({
  experience_id: Joi.number().integer().positive().required(),
  slot_id: Joi.number().integer().positive().required(),
  customer_name: Joi.string().min(2).max(255).required(),
  customer_email: Joi.string().email().required(),
  quantity: Joi.number().integer().min(1).max(10).required(),
  promo_code: Joi.string().optional().allow('')
});

const promoValidationSchema = Joi.object({
  code: Joi.string().required(),
  amount: Joi.number().precision(2).positive().required()
});

const validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validatePromo = (req, res, next) => {
  const { error } = promoValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = {
  validateBooking,
  validatePromo
};