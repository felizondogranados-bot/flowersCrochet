/**
 * 📚 DOCUMENTACIÓN COMPLETA DEL PROYECTO
 * ====================================
 * Flowers Crochet - E-commerce de Productos Tejidos
 * Fecha de Actualización: 2026-05-24
 * 
 * Este documento contiene toda la información sobre la estructura,
 * componentes, contextos y cambios realizados.
 */

// ============================================================================
// 🏗️ ESTRUCTURA DEL PROYECTO
// ============================================================================

/**
 * flowersCrochet/
 * ├── public/
 * │   ├── products/                    [Imágenes de productos]
 * │   │   ├── Rosas.jpg
 * │   │   ├── Girasol.jpg
 * │   │   ├── ... (24 imágenes de productos)
 * │   ├── hero.jpg                     [⚠️ Faltante]
 * │   └── patternFlowers.png           [⚠️ Faltante]
 * │
 * ├── src/
 * │   ├── components/
 * │   │   ├── Navbar.jsx
 * │   │   ├── Hero.jsx                 [✅ Documentado]
 * │   │   ├── BannerSlider.jsx         [✅ Documentado]
 * │   │   ├── CarouselAmigurumisCute.jsx [✅ NUEVO]
 * │   │   ├── Categories.jsx           [✅ Documentado]
 * │   │   ├── Cart.jsx                 [✅ Documentado + Imágenes agregadas]
 * │   │   ├── Products.jsx
 * │   │   ├── ProductCard.jsx
 * │   │   ├── OrderInfo.jsx
 * │   │   ├── Footer.jsx
 * │   │   └── ScrollToTop.jsx
 * │   │
 * │   ├── context/
 * │   │   ├── CartContext.jsx          [✅ Documentado]
 * │   │   └── FavoritesContext.jsx     [✅ Documentado]
 * │   │
 * │   ├── pages/
 * │   │   ├── Home.jsx                 [✅ Documentado]
 * │   │   ├── Catalogo.jsx
 * │   │   ├── Carrito.jsx
 * │   │   ├── Favoritos.jsx
 * │   │   └── ProductDetail.jsx
 * │   │
 * │   ├── data/
 * │   │   └── products.js              [✅ Documentado]
 * │   │
 * │   ├── App.jsx                      [✅ Documentado]
 * │   └── main.jsx
 * │
 * └── GUÍA_IMÁGENES.md                 [✅ NUEVO]
 */

// ============================================================================
// 🎯 CAMBIOS REALIZADOS (2026-05-24)
// ============================================================================

/**
 * 1. ✅ CARRUSEL AMIGURUMIS & ACCESORIOS CUTE
 *    - Archivo: src/components/CarouselAmigurumisCute.jsx
 *    - Funcionalidad: Carrusel interactivo con 4 imágenes
 *    - Auto-avance cada 4 segundos
 *    - Botones de navegación (anterior/siguiente)
 *    - Indicadores de posición
 *    - Documentación completa incluida
 * 
 * 2. ✅ IMÁGENES EN EL CARRITO
 *    - Archivo: src/components/Cart.jsx
 *    - Cambio: Resumen del pedido ahora muestra imágenes miniaturas
 *    - Tamaño: 80x80px por producto
 *    - Layout: Grid de 3 columnas (imagen + información)
 *    - Fallback: Placeholder si imagen no carga
 * 
 * 3. ✅ CÓDIGO COMPLETAMENTE DOCUMENTADO
 *    - Archivo: Cart.jsx
 *    - Archivo: Hero.jsx
 *    - Archivo: BannerSlider.jsx
 *    - Archivo: Categories.jsx
 *    - Archivo: Home.jsx (página)
 *    - Archivo: CartContext.jsx
 *    - Archivo: FavoritesContext.jsx
 *    - Archivo: products.js
 *    - Archivo: App.jsx
 *    
 *    Cada archivo incluye:
 *    - Descripción del componente
 *    - Parámetros y tipos
 *    - Imágenes requeridas
 *    - Funcionalidades principales
 *    - JSDoc comentarios
 * 
 * 4. ✅ HOME PAGE ACTUALIZADA
 *    - Incluye nuevo carrusel entre BannerSlider y Categories
 *    - Componentes en orden:
 *      1. Hero (introducción)
 *      2. BannerSlider (promociones)
 *      3. CarouselAmigurumisCute (NUEVO)
 *      4. Categories (categorías)
 *      5. OrderInfo (información de pedidos)
 *      6. Footer (pie de página)
 */

// ============================================================================
// 🔧 CÓMO FUNCIONA CADA COMPONENTE
// ============================================================================

/**
 * CAROUSEL AMIGURUMIS & ACCESORIOS CUTE
 * =====================================
 * 
 * Ubicación: src/components/CarouselAmigurumisCute.jsx
 * Ubicación en página: Home.jsx (después de BannerSlider)
 * 
 * CARACTERÍSTICAS:
 * ✨ Carrusel automático - cambia imagen cada 4 segundos
 * ✨ Botones manual - navegar con flechas
 * ✨ Indicadores - puntos que muestran posición
 * ✨ Clickeable - hacer click en puntos para saltar a imagen
 * ✨ Transición suave - fade effect de 700ms
 * 
 * IMÁGENES ACTUALES (URLs externas):
 * - https://i.pinimg.com/736x/84/4f/1c/844f1c1ec9f9a14a0ebc9285a5f5d2cf.jpg
 * - https://i.pinimg.com/736x/9f/92/52/9f9252e68c0e57a8f46db9dc3fc57f0e.jpg
 * - https://i.pinimg.com/736x/0d/88/47/0d88471975efc60f38c4bcb3f62ef5dd.jpg
 * - https://i.pinimg.com/736x/9e/14/6d/9e146d5c6815fc39e01cfe1a4f9f4fcb.jpg
 * 
 * PARA CAMBIAR IMÁGENES:
 * Editar el array 'imagenes' en CarouselAmigurumisCute.jsx (línea ~30)
 * 
 * FUNCIONES PRINCIPALES:
 * - siguienteImagen() → Avanza al siguiente (derecha a izquierda)
 * - imagenAnterior() → Va al anterior (izquierda a derecha)
 * - useEffect() → Auto-avance cada 4 segundos
 */

/**
 * CARRITO CON IMÁGENES
 * ====================
 * 
 * Ubicación: src/components/Cart.jsx
 * Página: /carrito
 * 
 * NUEVAS CARACTERÍSTICAS:
 * ✨ Imágenes de productos en resumen del pedido
 * ✨ Layout mejorado con miniatura + información
 * ✨ Manejo de errores si imagen no carga
 * ✨ Estilos responsive
 * 
 * ESTRUCTURA DEL CARRITO:
 * - Lado Izquierdo: Resumen de productos con imágenes
 * - Lado Derecho: Formulario de información de pedido
 * 
 * FUNCIONALIDADES DEL CARRITO:
 * - Mostrar cada producto con:
 *   • Miniatura de imagen (80x80px)
 *   • Nombre del producto
 *   • Cantidad
 *   • Colores personalizados (si aplica)
 *   • Precio subtotal
 *   • Botón eliminar (✕)
 * 
 * - Calcular total automáticamente
 * - Validar formulario antes de enviar
 * - Soportar 2 tipos de entrega:
 *   • Personal (Tilarán, Cañas, Liberia)
 *   • Correos Costa Rica
 * - Enviar pedido a WhatsApp con detalles
 * - Mostrar información de pago
 */

/**
 * CONTEXTOS (Context API)
 * ======================
 * 
 * 1. CartContext (src/context/CartContext.jsx)
 *    - Estado global del carrito
 *    - Métodos: addToCart(), removeFromCart()
 *    - Proporciona: cart[], addToCart, removeFromCart
 * 
 * 2. FavoritesContext (src/context/FavoritesContext.jsx)
 *    - Estado global de favoritos
 *    - Método: toggleFavorite() (agregar/eliminar)
 *    - Proporciona: favorites[], toggleFavorite
 * 
 * ESTRUCTURA DE PRODUCTO EN CARRITO:
 * {
 *   cartId: "uuid_aleatorio",
 *   id: 1,
 *   nombre: "Rosas",
 *   precio: 3000,
 *   cantidad: 1,
 *   imagen: "/flowersCrochet/products/Rosas.jpg",
 *   colorFlor: "Rojo",
 *   colorDecoracion: "Blanco",
 *   descripcionCliente: "Con lazos verdes"
 * }
 */

// ============================================================================
// 📱 RUTAS DE LA APLICACIÓN
// ============================================================================

/**
 * ESTRUCTURA DE RUTAS
 * ===================
 * 
 * Punto de entrada: App.jsx
 * Base: /flowersCrochet/
 * 
 * RUTAS DISPONIBLES:
 * ─────────────────
 * 
 * GET /                    → Home.jsx
 *     - Página principal con hero, banners, carrusel y categorías
 * 
 * GET /catalogo           → Catalogo.jsx
 *     - Listado de productos filtrable
 *     - Parámetro: ?categoria=NombreCategoria
 * 
 * GET /carrito            → Carrito.jsx (actualizado con imágenes)
 *     - Resumen del carrito
 *     - Formulario de pedido
 *     - Envío a WhatsApp
 * 
 * GET /favoritos          → Favoritos.jsx
 *     - Productos marcados como favoritos
 * 
 * GET /producto/:id       → ProductDetail.jsx
 *     - Detalle completo de un producto
 *     - Opciones de personalización
 * 
 * CATEGORÍAS FILTRADO:
 * ────────────────────
 * /catalogo?categoria=Flores
 * /catalogo?categoria=Ramos
 * /catalogo?categoria=Llaveros
 * /catalogo?categoria=Amigurumis
 * /catalogo?categoria=Accesorios
 */

// ============================================================================
// 🎨 COMPONENTES PRINCIPALES
// ============================================================================

/**
 * HOME PAGE (src/pages/Home.jsx)
 * ==============================
 * Composición de componentes en orden:
 * 1. Hero - Sección principal con CTA
 * 2. BannerSlider - Carrusel de 3 banners promocionales
 * 3. CarouselAmigurumisCute - NUEVO: Carrusel de amigurumis
 * 4. Categories - Grid de 4 categorías
 * 5. OrderInfo - Información sobre cómo pedir
 * 6. Footer - Pie de página
 * 
 * NUEVAS IMÁGENES REQUERIDAS:
 * - /public/hero.jpg (imagen principal)
 * - /public/patternFlowers.png (patrón de fondo)
 */

/**
 * HERO COMPONENT
 * ==============
 * Ubicación: src/components/Hero.jsx
 * Propósito: Primera impresión, llamadas a acción
 * 
 * ELEMENTOS:
 * - Título: "Amigurumis & Accesorios Cute"
 * - Descripción: Breve presentación
 * - Botón Ver Catálogo (→ /catalogo)
 * - Botón WhatsApp (→ https://wa.me/50688115650)
 * - Imagen destacada (⚠️ /public/hero.jpg)
 * - Fondo con patrón floral (⚠️ /public/patternFlowers.png)
 */

/**
 * BANNER SLIDER
 * =============
 * Ubicación: src/components/BannerSlider.jsx
 * Propósito: Promocionar colecciones
 * 
 * BANNERS:
 * 1. Colección Sanrio 🌸
 * 2. Flores Crochet 💖
 * 3. Accesorios Cute 🎀
 * 
 * CARACTERÍSTICAS:
 * - Auto-avance cada 3 segundos
 * - Loop infinito
 * - Overlay con sombra para texto
 * - Usa librería Swiper
 */

/**
 * CATEGORIES COMPONENT
 * ====================
 * Ubicación: src/components/Categories.jsx
 * Propósito: Navegación por categorías
 * 
 * CATEGORÍAS MOSTRADAS:
 * 1. Flores 🌷 → /catalogo?categoria=Flores
 * 2. Llaveros 🧸 → /catalogo?categoria=Llaveros
 * 3. Amigurumis 🧶 → /catalogo?categoria=Amigurumis
 * 4. Accesorios 🎀 → /catalogo?categoria=Accesorios
 * 
 * CARACTERÍSTICAS:
 * - Grid responsivo (2 en móvil, 4 en desktop)
 * - Efecto zoom en hover
 * - Overlay con degradado
 * - Links a catálogo filtrado
 */

// ============================================================================
// 💾 CONTEXTO DEL CARRITO
// ============================================================================

/**
 * FLUJO DE COMPRA
 * ===============
 * 
 * 1. Usuario selecciona producto en Catalogo
 * 2. Va a ProductDetail
 * 3. Personaliza (colores, decoración, etc.)
 * 4. Hace click en "Agregar al Carrito"
 * 5. Se ejecuta: addToCart(producto)
 * 6. Producto se agrega a: CartContext.cart[]
 * 
 * 7. Usuario va a /carrito
 * 8. Ve Carrito.jsx con:
 *    - Resumen de productos (AHORA CON IMÁGENES)
 *    - Total calculado
 *    - Formulario de información
 * 
 * 9. Completa información:
 *    - Nombre
 *    - Fecha de entrega
 *    - Tipo de entrega
 *    - Dirección
 * 
 * 10. Hace click en "Realizar Pedido"
 * 11. Se valida el formulario
 * 12. Se abre WhatsApp con el pedido formateado
 * 13. Usuario finaliza conversación en WhatsApp
 * 
 * ESTRUCTURA DEL MENSAJE WhatsApp:
 * ────────────────────────────────
 * - Encabezado con decoración
 * - Información del cliente
 * - Detalles de cada producto
 * - Resumen de precios
 * - Información de pago (50% adelanto)
 * - Número para SINPE móvil
 */

// ============================================================================
// 🖼️ IMÁGENES REQUERIDAS
// ============================================================================

/**
 * VER ARCHIVO: GUÍA_IMÁGENES.md
 * 
 * RESUMEN RÁPIDO:
 * 
 * PRESENTES ✓:
 * - Todas las imágenes de productos en /public/products/
 * 
 * FALTANTES ⚠️:
 * - /public/hero.jpg
 * - /public/patternFlowers.png
 * - Imágenes adicionales para carrusel de amigurumis
 * 
 * RECOMENDACIÓN:
 * Crear o descargar estas imágenes y colocarlas en /public/
 * para mejorar el rendimiento de la aplicación.
 */

// ============================================================================
// 📝 CARACTERÍSTICAS PRINCIPALES DEL PROYECTO
// ============================================================================

/**
 * ✅ CARRITO DE COMPRAS
 *    - Agregar/eliminar productos
 *    - Calcular total automático
 *    - Visualizar imágenes de productos
 *    - Formulario de información de pedido
 *    - Integración con WhatsApp
 * 
 * ✅ PRODUCTOS
 *    - 24+ productos catalogados
 *    - Personalización de colores
 *    - Soporte para imágenes personalizadas
 *    - Categorización (Flores, Ramos, Llaveros, Amigurumis, Accesorios)
 * 
 * ✅ FAVORITOS
 *    - Marcar/desmarcar como favorito
 *    - Página de favoritos
 *    - Estado persistente en contexto
 * 
 * ✅ NAVEGACIÓN
 *    - Navbar principal
 *    - Routes con React Router
 *    - Navegación por categorías
 *    - Filtrado de productos
 * 
 * ✅ ESTILOS
 *    - Tailwind CSS
 *    - Diseño responsivo
 *    - Paleta de colores rosa/blanco
 *    - Animaciones suaves
 * 
 * ✅ CARRUSEL
 *    - Amigurumis & Accesorios Cute (NUEVO)
 *    - Banner de promociones
 *    - Autoplay y navegación manual
 * 
 * ✅ DOCUMENTACIÓN
 *    - Código completamente comentado
 *    - JSDoc en funciones
 *    - Archivo de referencia de imágenes
 * 
 * ✨ INTEGRACIONES
 *    - WhatsApp para pedidos
 *    - Librería Swiper para carruseles
 *    - React Router para navegación
 *    - Context API para estado global
 */

// ============================================================================
// 🚀 PRÓXIMAS MEJORAS SUGERIDAS
// ============================================================================

/**
 * 1. 📸 Agregar imágenes faltantes
 *    - hero.jpg para sección Hero
 *    - patternFlowers.png para patrón de fondo
 *    - Más imágenes de amigurumis
 * 
 * 2. 🖼️ Migrar imágenes a locales
 *    - Cambiar URLs de Pinterest a archivos locales
 *    - Mejorar velocidad de carga
 * 
 * 3. 📦 Optimizar imágenes
 *    - Comprimir sin perder calidad
 *    - Usar formatos modernos (WebP)
 * 
 * 4. 💾 Persistencia de datos
 *    - Guardar carrito en localStorage
 *    - Guardar favoritos en localStorage
 * 
 * 5. 🔐 Seguridad
 *    - Validar inputs en servidor
 *    - HTTPS en producción
 * 
 * 6. 📊 Analytics
 *    - Rastrear productos más vendidos
 *    - Monitorear conversiones
 * 
 * 7. 🎯 SEO
 *    - Meta tags optimizadas
 *    - URLs amigables
 *    - Schema.org markup
 * 
 * 8. 🧪 Testing
 *    - Unit tests con Jest
 *    - Testing de componentes con React Testing Library
 * 
 * 9. 💳 Pagos
 *    - Integración con pasarela de pago
 *    - Generar comprobantes
 * 
 * 10. 📧 Email
 *     - Confirmar pedidos por email
 *     - Notificaciones de estado
 */

// ============================================================================
// 📞 INFORMACIÓN DE CONTACTO
// ============================================================================

/**
 * WhatsApp: +506 8811 5650
 * Link directo: https://wa.me/50688115650
 * 
 * SINPE Móvil: 6862 8115 650
 * 
 * Lugares de entrega personal:
 * - Tilarán
 * - Cañas
 * - Liberia
 * 
 * Envíos: Correos de Costa Rica
 */

// ============================================================================
// 📅 HISTORIAL DE CAMBIOS
// ============================================================================

/**
 * 2026-05-24 - VERSIÓN CON DOCUMENTACIÓN Y MEJORAS
 * ================================================
 * ✅ Agregado: Componente CarouselAmigurumisCute
 * ✅ Agregado: Imágenes en el carrito
 * ✅ Agregado: Documentación completa en todo el código
 * ✅ Agregado: Archivo GUÍA_IMÁGENES.md
 * ✅ Actualizado: Home.jsx con nuevo carrusel
 * ✅ Actualizado: Cart.jsx con imágenes
 * ✅ Documentado: Todos los componentes
 * ✅ Documentado: Todos los contextos
 */

// ============================================================================
// ⚡ CÓMO EMPEZAR A TRABAJAR
// ============================================================================

/**
 * 1. Instalar dependencias:
 *    npm install
 * 
 * 2. Ejecutar en desarrollo:
 *    npm run dev
 * 
 * 3. Construir para producción:
 *    npm run build
 * 
 * 4. Archivos importantes:
 *    - src/App.jsx (punto de entrada)
 *    - src/pages/Home.jsx (página principal)
 *    - src/components/Cart.jsx (carrito mejorado)
 *    - src/components/CarouselAmigurumisCute.jsx (nuevo)
 *    - GUÍA_IMÁGENES.md (referencia de imágenes)
 * 
 * 5. Para agregar imágenes:
 *    - Colocar en /public/ o /public/products/
 *    - Actualizar rutas en componentes
 *    - Consultar GUÍA_IMÁGENES.md
 */

// ============================================================================
// 🎉 ¡PROYECTO ACTUALIZADO Y DOCUMENTADO!
// ============================================================================

/**
 * El proyecto "Flowers Crochet" ahora incluye:
 * ✨ Carrusel de Amigurumis & Accesorios Cute con navegación
 * ✨ Imágenes de productos en el resumen del carrito
 * ✨ Código completamente documentado con comentarios
 * ✨ Guía de imágenes para saber dónde colocar cada una
 * 
 * Próximo paso: Agregar las imágenes faltantes
 * (hero.jpg, patternFlowers.png, más amigurumis)
 * 
 * ¡Gracias por usar Flowers Crochet! 🌸
 */
