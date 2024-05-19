import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { useOrderDetail } from '../hooks/useOrderDetail'
import TabPanel from './TabPanel'
import RefactionsGrid from './RefactionsGrid'
import ActivitiesGrid from './ActivitiesGrid'
import StatusInput from './StatusInput'

export default function DialogOrderDetail({ open, onClose }) {
  const { order, tab, changeTab, updateStatus, isSaving } = useOrderDetail()

  const handleChangeStatus = async (e) => {
    updateStatus(e.target.value)
  }

  return (
    <Dialog fullWidth maxWidth="xl" open={open} onClose={onClose}>
      {order && (
        <>
          <DialogTitle>No OT {order.Id}</DialogTitle>
          <DialogContent>
            <Tabs
              value={tab}
              onChange={(_, value) => {
                changeTab(value)
              }}
            >
              <Tab label="OT" />
              <Tab label="REFACCIONES" />
              <Tab label="ACTIVIDADES" />
            </Tabs>
            <TabPanel tab={tab} index={0}>
              <Box sx={{ py: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="NOMBRE"
                  value={order.Nombre}
                  inputProps={{
                    readOnly: true,
                  }}
                />
                <Stack direction="row" sx={{ py: 2 }} spacing={2}>
                  <Stack flexGrow={1} spacing={2}>
                    <DateTimePicker
                      size="small"
                      label="FECHA ORDEN TRABAJO"
                      value={dayjs.utc(
                        order.FechaOrdenTrabajo,
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                      readOnly
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                        },
                      }}
                    />
                    <DateTimePicker
                      size="small"
                      label="FECHA PROMESA"
                      value={dayjs.utc(
                        order.FechaPromesa,
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                      readOnly
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                        },
                      }}
                    />
                    <DateTimePicker
                      size="small"
                      label="FECHA REPORTE"
                      value={dayjs.utc(
                        order.FechaReporte,
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                      readOnly
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                        },
                      }}
                    />
                    <DateTimePicker
                      size="small"
                      label="FECHA INICIO"
                      value={dayjs.utc(
                        order.FechaInicial,
                        'YYYY-MM-DD HH:mm:ss',
                      )}
                      readOnly
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                        },
                      }}
                    />
                    <DateTimePicker
                      size="small"
                      label="FECHA FIN"
                      value={dayjs.utc(order.FechaFinal, 'YYYY-MM-DD HH:mm:ss')}
                      readOnly
                      slotProps={{
                        textField: {
                          size: 'small',
                          fullWidth: true,
                        },
                      }}
                    />
                  </Stack>
                  <Stack flexGrow={1} spacing={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="TALLER"
                      value={order.Taller}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="UNIDAD (CENTRO COSTOS)"
                      value={order.Unidad}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="Odómetro / KM"
                      value={order.Hodometro}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                  <Stack flexGrow={1} spacing={2}>
                    <StatusInput
                      value={order.EstatusId}
                      onChange={handleChangeStatus}
                      isLoading={isSaving}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="TIPO OT"
                      value={order.TipoOrden}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="ALMACEN"
                      value={order.Almacen}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                  <Stack flexGrow={1} spacing={2}>
                    <TextField
                      fullWidth
                      size="small"
                      label="USUARIO"
                      value={order.Usuario}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="USUARIO CIERRE"
                      value={order.UsuarioCierre}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      label="AUTORIZA"
                      value={order.Autoriza}
                      inputProps={{
                        readOnly: true,
                      }}
                    />
                  </Stack>
                </Stack>
              </Box>
            </TabPanel>
            <TabPanel tab={tab} index={1}>
              <RefactionsGrid refactions={order.Refacciones} />
            </TabPanel>
            <TabPanel tab={tab} index={2}>
              <ActivitiesGrid activities={order.Actividades} />
            </TabPanel>
          </DialogContent>
        </>
      )}
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}
