import { body } from "express-validator";

export const categoriaCreateRq = () => [
    body("nombre")
        .trim()
        .notEmpty().withMessage("El nombre es obligatorio")
        .isString().withMessage("El nombre debe ser texto")
        .isLength({ min: 3, max: 50 }).withMessage("El nombre debe tener entre 3 y 50 caracteres"),

    body("tipo")
        .trim()
        .notEmpty().withMessage("El tipo es obligatorio")
        .isIn(["ingreso", "gasto", "transferencia", "ahorro"])
        .withMessage("El tipo debe ser: ingreso, gasto, transferencia o ahorro"),
];