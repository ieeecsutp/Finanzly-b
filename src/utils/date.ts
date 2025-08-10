/**
 * Convierte una fecha en formato `YYYY-MM-DD` (string) o un objeto `Date`
 * a una instancia de `Date` con la hora configurada a las 00:00:00 UTC.
 *
 * Esta función es útil para transformar fechas enviadas por el frontend
 * (como strings sin hora) al formato `DateTime` esperado por Prisma o la base de datos.
 *
 * @param date - Fecha como `string` (YYYY-MM-DD) o como objeto `Date`.
 * @returns Una instancia de `Date` con hora UTC a medianoche.
 */
export function parseDateToDateTime(date: string | Date): Date {
  if (date instanceof Date) return date;
  return new Date(`${date}T00:00:00Z`);
}


/**
 * Convierte una instancia de `Date` a un string con formato `YYYY-MM-DD`.
 *
 * Esta función es ideal para devolver fechas limpias (sin hora) al frontend,
 * por ejemplo, en campos de formularios o resúmenes de datos.
 *
 * @param date - Objeto `Date` a convertir.
 * @returns Fecha en formato `YYYY-MM-DD`.
 */
export function formatDateToYYYYMMDD(date: Date): string {
  return date.toISOString().split("T")[0];
}

/**
 * Convierte una instancia de `Date` a una cadena en formato ISO completo,
 * incluyendo fecha y hora (`YYYY-MM-DDTHH:mm:ss.sssZ`).
 *
 * Útil para almacenar fechas con hora exacta o para registros con precisión temporal.
 *
 * @param date - Objeto `Date` a formatear.
 * @returns Fecha y hora en formato ISO 8601 completo.
 */
export function formatDateToISO(date: Date): string {
  return date.toISOString();
}