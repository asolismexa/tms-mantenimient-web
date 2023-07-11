export const types = [
  { value: 1, label: 'AUX MECANICO' },
  { value: 2, label: 'CAMPAÑA' },
  { value: 3, label: 'CORRECTIVO' },
  { value: 4, label: 'DAÑOS' },
  { value: 5, label: 'EXPRESS' },
  { value: 6, label: 'GARANTIA' },
  { value: 7, label: 'LAVADO DE UNIDADES' },
  { value: 8, label: 'LLANTAS' },
  { value: 10, label: 'PEVENTIVO' },
]

export const status = [
  { value: 1, label: 'REPORTADO' },
  { value: 2, label: 'ASIGNADO' },
  { value: 3, label: 'ATENDIDO' },
]

export const statusEnum = Object.freeze({
  REPORTADO: 1,
  ASIGNADO: 2,
  ATENDIDO: 3,
  VALIDADO: 4,
})
