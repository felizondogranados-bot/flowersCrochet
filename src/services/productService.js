/**
 * RESPONSABILIDAD DE LA CARPETA (src/services):
 * ============================================
 * Esta carpeta contiene módulos encargados de la comunicación externa,
 * consumo de APIs públicas, llamadas HTTP (fetch) o servicios de persistencia.
 * Separa la lógica de obtención de datos del ciclo de vida de los componentes React.
 * 
 * Temas demostrados:
 * - Módulos ESM (export, import)
 * - Asincronía (fetch, async/await)
 * - Estructuras de control y errores (try/catch, throw)
 * - JavaScript Moderno (const, arrow functions, template literals)
 */

/**
 * Obtiene la lista de productos de forma asíncrona desde el archivo productos.json.
 * 
 * [JS Avanzado: Función reutilizable y asíncrona]
 * [ESM: export]
 * 
 * @async
 * @function
 * @returns {Promise<Array>} Promesa que resuelve al array de productos.
 * @throws {Error} Si la respuesta de red no es correcta o ocurre un fallo de lectura.
 */
export const getProducts = async () => {
    // [JS: const] Declaración de constantes de ruta (principal con base path y fallback de raíz)
    const primaryUrl = `${import.meta.env.BASE_URL || '/'}productos.json`;
    const fallbackUrl = "/productos.json";

    // [JS Avanzado: try/catch] Primer intento con la ruta configurada en Vite (primaryUrl)
    try {
        const response = await fetch(primaryUrl);
        if (!response.ok) {
            throw new Error(`Fallo primario HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (primaryError) {
        console.warn("Intento con ruta base falló, probando fallback de raíz...", primaryError);
        
        // [JS Avanzado: try/catch anidado] Intento alternativo desde la raíz del host
        try {
            const fallbackResponse = await fetch(fallbackUrl);
            if (!fallbackResponse.ok) {
                throw new Error(`Error HTTP Fallback: ${fallbackResponse.status}`);
            }
            return await fallbackResponse.json();
        } catch (fallbackError) {
            console.error("Ambos intentos de fetch fallaron.", fallbackError);
            throw fallbackError;
        }
    }
};
