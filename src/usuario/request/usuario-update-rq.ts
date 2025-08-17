import { body } from "express-validator";

export const userUpdateRq = () => [
  body("nombre")
    .optional()
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isString().withMessage("El nombre debe ser texto")
    .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

  body("correo")
    .optional()
    .trim()
    .notEmpty().withMessage("El correo es obligatorio")
    .isEmail().withMessage("Debe ser un correo válido"),

  body("contraseña")
    .optional()
    .trim()
    .notEmpty().withMessage("La contraseña es obligatoria")
    .isLength({ min: 8, max: 50 }).withMessage("La contraseña debe tener entre 8 y 50 caracteres")
];