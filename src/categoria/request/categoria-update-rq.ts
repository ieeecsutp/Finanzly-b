import { body } from "express-validator";

export const categoriaUpdateRq = () => [
    body("nombre")
        .optional()
        .trim()
        .notEmpty().withMessage("El nombre no puede estar vacío")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ min: 3, max: 50 }).withMessage("El nombre debe tener entre 3 y 50 caracteres"),

    body("tipo")
        .optional()
        .trim()
        .notEmpty().withMessage("El tipo no puede estar vacío")
        .isIn(["ingreso", "gasto", "transferencia", "ahorro"])
        .withMessage("El tipo debe ser: ingreso, gasto, transferencia o ahorro"),
];