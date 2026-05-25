/**
 * generatePDF.js - Utilidad para generar PDFs de pedidos
 * ========================================================
 * Función para generar un PDF con el resumen completo del pedido
 * incluyendo imágenes de productos, colores y datos del cliente.
 */

import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/**
 * Genera un PDF con el resumen del pedido
 * @param {Array} cart - Array de productos en el carrito
 * @param {Object} datos - Datos del cliente
 * @param {number} total - Total del pedido
 */
export const generarPDFPedido = async (cart, datos, total) => {
    try {
        // Crear elemento HTML invisible para capturar
        const elemento = document.createElement('div')
        elemento.style.position = 'absolute'
        elemento.style.left = '-10000px'
        elemento.style.width = '210mm' // Ancho A4
        elemento.style.backgroundColor = 'white'
        elemento.style.padding = '20px'
        elemento.style.fontFamily = 'Arial, sans-serif'
        
        // Construir HTML del PDF
        let htmlContent = `
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #ec4899; font-size: 28px; margin: 0;">🌸 FLOWERS CROCHET</h1>
                <p style="color: #999; margin: 5px 0 0 0;">Tejidos con mucho amor</p>
            </div>

            <hr style="border: none; border-top: 2px solid #fce7f3; margin: 20px 0;">

            <h2 style="color: #333; font-size: 20px; margin-bottom: 15px;">📋 RESUMEN DEL PEDIDO</h2>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <thead>
                    <tr style="background-color: #fce7f3; border-bottom: 2px solid #ec4899;">
                        <th style="padding: 10px; text-align: left; color: #333; width: 80px;">Imagen</th>
                        <th style="padding: 10px; text-align: left; color: #333;">Producto</th>
                        <th style="padding: 10px; text-align: center; color: #333;">Cant.</th>
                        <th style="padding: 10px; text-align: right; color: #333;">Precio Unit.</th>
                        <th style="padding: 10px; text-align: right; color: #333;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
        `

        // Agregar cada producto a la tabla
        cart.forEach((item) => {
            const subtotal = item.precio * item.cantidad
            const coloresInfo = []
            
            if (item.colorFlor) {
                coloresInfo.push(`🌸 ${item.colorFlor.nombre}`)
            }
            if (item.colorDecoracion) {
                coloresInfo.push(`🎀 ${item.colorDecoracion.nombre}`)
            }

            htmlContent += `
                <tr style="border-bottom: 1px solid #f0f0f0; vertical-align: top;">
                    <td style="padding: 10px; text-align: center;">
                        <img src="${item.imagen}" alt="${item.nombre}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 5px; border: 1px solid #ddd;" />
                    </td>
                    <td style="padding: 15px; color: #333;">
                        <strong>${item.nombre}</strong>
                        ${coloresInfo.length > 0 ? `<br><small style="color: #999; font-size: 11px;">${coloresInfo.join(', ')}</small>` : ''}
                    </td>
                    <td style="padding: 15px; text-align: center; color: #333;">${item.cantidad}</td>
                    <td style="padding: 15px; text-align: right; color: #333;">₡${item.precio.toLocaleString()}</td>
                    <td style="padding: 15px; text-align: right; color: #333;"><strong>₡${subtotal.toLocaleString()}</strong></td>
                </tr>
            `
        })

        const adelanto = Math.ceil(total * 0.5)

        htmlContent += `
                </tbody>
            </table>

            <div style="background-color: #fce7f3; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #333;">Cantidad de productos:</span>
                    <strong style="color: #333;">${cart.length}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span style="color: #333;">Total de items:</span>
                    <strong style="color: #333;">${cart.reduce((sum, item) => sum + item.cantidad, 0)}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; border-top: 2px solid #ec4899; padding-top: 10px;">
                    <span style="color: #ec4899; font-size: 18px;"><strong>TOTAL:</strong></span>
                    <strong style="color: #ec4899; font-size: 18px;">₡${total.toLocaleString()}</strong>
                </div>
            </div>

            <hr style="border: none; border-top: 2px solid #fce7f3; margin: 20px 0;">

            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">👤 INFORMACIÓN DEL CLIENTE</h2>

            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Nombre:</strong> ${datos.nombreCliente}</p>
                <p style="margin: 5px 0;"><strong>Fecha de entrega:</strong> ${datos.fechaEntrega}</p>
                <p style="margin: 5px 0;"><strong>Tipo de entrega:</strong> ${datos.tipoEntrega === 'personal' ? 'Entrega Personal' : 'Envío por Correos'}</p>
        `

        if (datos.tipoEntrega === 'personal') {
            htmlContent += `<p style="margin: 5px 0;"><strong>Lugar:</strong> ${datos.lugarEntrega}</p>`
        } else {
            htmlContent += `
                <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${datos.telefonoCliente}</p>
                <p style="margin: 5px 0;"><strong>Provincia:</strong> ${datos.provincia}</p>
                <p style="margin: 5px 0;"><strong>Cantón:</strong> ${datos.canton}</p>
                <p style="margin: 5px 0;"><strong>Distrito:</strong> ${datos.distrito}</p>
                <p style="margin: 5px 0;"><strong>Dirección:</strong> ${datos.direccionExacta}</p>
            `
        }

        htmlContent += `
            </div>

            <hr style="border: none; border-top: 2px solid #fce7f3; margin: 20px 0;">

            <h2 style="color: #333; font-size: 18px; margin-bottom: 15px;">💳 INFORMACIÓN DE PAGO</h2>

            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 5px 0;"><strong>Total a pagar:</strong> <span style="color: #ec4899; font-size: 16px;">₡${total.toLocaleString()}</span></p>
                <p style="margin: 5px 0;"><strong>Adelanto requerido (50%):</strong> <span style="color: #ec4899; font-size: 16px;">₡${adelanto.toLocaleString()}</span></p>
                <p style="margin: 5px 0;"><strong>Saldo a la entrega:</strong> <span style="color: #ec4899; font-size: 16px;">₡${(total - adelanto).toLocaleString()}</span></p>
                <p style="margin: 15px 0 0 0; color: #666; font-size: 12px;">
                    💳 SINPE Móvil: <strong>88115650</strong> a nombre de <strong>Francela Elizondo</strong><br>
                    ⏳ Tiempo de entrega: 3 a 7 días hábiles
                </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #fce7f3;">
                <p style="color: #ec4899; font-size: 14px; margin: 0;">
                    💖 ¡Gracias por tu pedido! Nos encanta trabajar para ti 🌸
                </p>
                <p style="color: #ec4899; background-color: #fce7f3; padding: 10px; border-radius: 5px; font-size: 13px; font-weight: bold; margin: 10px 0 0 0;">
                    📲 ENVÍA ESTE PDF POR WHATSAPP PARA CONFIRMAR TU PEDIDO
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0 0 0;">
                    Flowers Crochet | Tel: +506 8811 5650 | WhatsApp: 6862 8115 650
                </p>
            </div>
        `

        elemento.innerHTML = htmlContent
        document.body.appendChild(elemento)

        // Capturar el contenido como canvas
        const canvas = await html2canvas(elemento, {
            backgroundColor: '#ffffff',
            scale: 2,
            logging: false,
        })

        // Crear PDF
        const pdf = new jsPDF('p', 'mm', 'a4')
        const imgData = canvas.toDataURL('image/png')
        const imgWidth = 210 // A4 width en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        
        let heightLeft = imgHeight
        let position = 0

        // Agregar páginas si es necesario
        while (heightLeft > 0) {
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
            heightLeft -= 297 // A4 height en mm
            if (heightLeft > 0) {
                pdf.addPage()
                position = heightLeft - imgHeight
            }
        }

        // Descargar PDF
        const fecha = new Date().toISOString().split('T')[0]
        pdf.save(`Pedido_FlowersCrochet_${fecha}.pdf`)

        // Limpiar
        document.body.removeChild(elemento)

        return true
    } catch (error) {
        console.error('Error al generar PDF:', error)
        return false
    }
}
