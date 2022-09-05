const { res, req } = require('express');
const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({
      errors,
      status: 400,
      status_title: "Faltan campos por rellenar",
      status_message: `Complete todos los campos antes de enviar \nVerifique que todos los campos están rellenos. Por favor.`,
    });
  }

  next();
};

module.exports = validateFields;
