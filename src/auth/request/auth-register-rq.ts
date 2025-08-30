import { body } from "express-validator";

export const authRegisterRq = () => [
    body("nombre")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ min: 3 }).withMessage("El nombre debe tener al menos 3 caracteres"),

    body("correo")
        .trim()
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("Debe ser un correo válido"),

    body("contraseña")
        .trim()
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 8, max: 50 }).withMessage("La contraseña debe tener entre 3 y 50 caracteres")
]