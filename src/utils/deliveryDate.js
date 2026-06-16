/**
 * RESPONSABILIDAD DE LA CARPETA (src/utils):
 * =========================================
 * Contiene funciones de ayuda de JavaScript. Este módulo calcula dinámicamente
 * la fecha mínima de entrega basada en días hábiles (excluyendo sábados y domingos).
 * 
 * Temas demostrados:
 * - ESM: export
 * - Let y Const
 * - Bucles While y control condicional de fechas
 * - Template literals
 */

/**
 * Calcula la fecha mínima de entrega (3 días hábiles a partir de hoy)
 * Ignorando sábados (6) y domingos (0).
 * 
 * @returns {string} Fecha formateada en YYYY-MM-DD
 */
export const getMinimumDeliveryDate = () => {
    // [JS Moderno: const] Obtenemos la fecha actual
    const date = new Date();
    
    // [JS Moderno: let] Contador de días hábiles añadidos
    let addedDays = 0;
    
    // Iteramos hasta acumular 3 días hábiles
    while (addedDays < 3) {
        // Avanzamos un día natural
        date.setDate(date.getDate() + 1);
        const dayOfWeek = date.getDay();
        
        // Si no es sábado (6) ni domingo (0), sumamos un día hábil
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            addedDays++;
        }
    }
    
    // Formateamos en YYYY-MM-DD para que sea compatible con el input type="date"
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    
    // [JS Moderno: Template Literals] Retornamos el string formateado
    return `${yyyy}-${mm}-${dd}`;
};
