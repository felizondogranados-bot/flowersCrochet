import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";

/**
 * RESPONSABILIDAD DE LA CARPETA (src/hooks):
 * =========================================
 * Esta carpeta contiene Hooks personalizados de React. Los custom hooks
 * permiten extraer la lógica de estado de los componentes para que sea
 * reutilizable, mantenible y testeable de forma independiente.
 * 
 * Temas demostrados:
 * - React Hooks (useState, useEffect)
 * - Módulos ESM (import, export default)
 * - Asincronía e Integración de Servicios (async/await, try/catch)
 * - JavaScript Moderno (const, arrow functions)
 */

/**
 * Hook personalizado useProducts
 * Encapsula la lógica de estado y asincronía del catálogo de productos.
 * 
 * [ESM: export default]
 * [JS Avanzado: Función reutilizable (Custom Hook)]
 * 
 * @returns {Object} Un objeto con: productos (Array), loading (boolean), error (string|null), retry (function)
 */
function useProducts() {
    // [React: useState] Estados para almacenar los productos, el estado de carga y posibles errores
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // [JS Avanzado: Callback / Función reutilizable] Función asíncrona interna para cargar los datos
    const cargarProductos = async () => {
        setLoading(true);
        setError(null);

        try {
            // [Asincronía: await] Esperamos la resolución de la promesa del servicio
            const data = await getProducts();
            
            // [React: useState setter] Asignamos los datos obtenidos al estado
            setProductos(data);
        } catch (err) {
            // [React: useState setter] Si falla el servicio, guardamos el mensaje de error
            setError("No se pudieron cargar los productos.");
        } finally {
            // Una vez finalizada la consulta (con éxito o error), desactivamos la carga
            setLoading(false);
        }
    };

    // [React: useEffect] Ejecuta el fetch asíncrono una única vez al montar el componente
    useEffect(() => {
        cargarProductos();
    }, []); // Array de dependencias vacío para emular componentDidMount

    // [JS: spread/destructuring/shorthand] Retornamos un objeto con los estados y la función de reintento
    return {
        productos,
        loading,
        error,
        retry: cargarProductos // [JS Avanzado: Callback] Permite al componente volver a invocar el fetch
    };
}

export default useProducts;
