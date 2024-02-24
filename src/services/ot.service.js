import axios from 'axios'

export const OTClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_OT_URL,
})

export const OT_BASE_URL = 'ordenesTrabajo'

export async function searchOts() {
  const body = {
    Nombre: '',
    Usuario_Id: null,
    Estatus_Id: 1,
    Fecha_Inicial: '2024-01-01 00:00:00.000',
    Fecha_Final: '2023-02-29 00:00:00.000',
    Centro_Costos_Id: null,
    Tipo_Orden_Trabajo_Id: null,
    Sin_Liberar: false,
  }

  return await OTClient.post(OT_BASE_URL, body)
}
