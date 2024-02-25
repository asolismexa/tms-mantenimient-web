import axios from 'axios'

export const OTClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_OT_URL,
})

export const OT_BASE_URL = 'ordenesTrabajo'

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
