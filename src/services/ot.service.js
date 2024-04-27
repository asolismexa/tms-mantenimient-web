import axios from 'axios'

export const OTClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_OT_URL,
})

export const OT_BASE_URL = 'TMS/Tms.svc/ordenesTrabajo'

/**
 * Searches for OTs (Ordenes de Trabajo) based on the provided parameters.
 *
 * @param {Object} options - The search options.
 * @param {string} options.name - The name to search for.
 * @param {string} options.startDate - The start date of the search range.
 * @param {string} options.endDate - The end date of the search range.
 * @param {boolean} options.released - Indicates if the OTs should be released or not.
 * @returns {Promise} A promise that resolves with the search results.
 */
export async function searchOts({ name, startDate, endDate, released }) {
  const body = {
    Nombre: name,
    Usuario_Id: null,
    Estatus_Id: 2,
    Fecha_Inicial: startDate,
    Fecha_Final: endDate,
    Centro_Costos_Id: null,
    Tipo_Orden_Trabajo_Id: null,
    Sin_Liberar: released,
  }

  return await OTClient.post(OT_BASE_URL, body)
}

const ORDERS_BASE_URL = 'Orden_Trabajo/OT/Orden_Trabajo.svc'

/**
 * Fetches the detail of the order found by id
 * @param {number} id - The identifier of the order
 * @returns {Promise} A promise that resolves with the ot data
 */
export async function getOrderDetail(id) {
  return (
    await OTClient.get(`${ORDERS_BASE_URL}/order`, {
      params: {
        Id: id,
      },
    })
  ).data
}

/**
 * Updates the status of an order.
 *
 * @param {Object} options - The options for updating the order status.
 * @param {number} options.orderId - The ID of the order to update.
 * @param {number} options.statusId - The ID of the new status for the order.
 * @returns {Promise<void>} A promise that resolves when the order status is updated.
 */
export async function updateOrderStatus({ orderId, statusId }) {}
