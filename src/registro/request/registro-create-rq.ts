import { body } from "express-validator";

export const registroCreateRq = () => [
    body("id_usuario")
        .notEmpty().withMessage("El ID del usuario es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID del usuario debe ser un número entero positivo"),

    body("id_categoria")
        .notEmpty().withMessage("El ID de la categoría es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID de la categoría debe ser un número entero positivo"),

    body("tipo")
        .trim()
        .notEmpty().withMessage("El tipo es obligatorio")
        .isIn(["ingreso", "gasto", "transferencia", "ahorro"])
        .withMessage("El tipo debe ser: ingreso, gasto, transferencia o ahorro"),

    body("descripcion")
        .trim()
        .notEmpty().withMessage("La descripción es obligatoria")
        .isString().withMessage("La descripción debe ser texto")
        .isLength({ min: 3, max: 500 }).withMessage("La descripción debe tener entre 3 y 500 caracteres (aprox. 100 palabras)"),

    body("monto")
        .notEmpty().withMessage("El monto es obligatorio")
        .isNumeric().withMessage("El monto debe ser un número válido"),

    body("fecha_registro")
        .notEmpty().withMessage("La fecha de registro es obligatoria")
        .isISO8601().withMessage("La fecha de registro debe tener un formato válido (ISO 8601)")
];