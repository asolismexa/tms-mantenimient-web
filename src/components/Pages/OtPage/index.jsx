import { useState, useMemo } from 'react'
import CustomDataGrid from '@/components/custom/CustomDataGrid'
import {
  Box,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material'
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers'
import { useSearchOTs } from '@/hooks/ots/useSearchOTs'
import { otPageColumns } from './columns'
import { useOrderDetail } from './hooks/useOrderDetail'
import LoadingBackdrop from '@/components/Core/LoadingBackdrop'
import dayjs from 'dayjs'

const initialForm = {
  name: '',
  userId: null,
  statusId: 1,
  startDate: null,
  endDate: null,
  costCenterId: null,
  orderTypeId: null,
  released: false,
}

export function OtPage() {
  const { ots, loading: isSearching, searchOts } = useSearchOTs()
  const [form, setForm] = useState(initialForm)
  // Main Slice
  const {
    order,
    isLoading,
    closeDialog: closeDetailDialog,
    openDialog: openDetailDialog,
    isDialogOpen,
  } = useOrderDetail()

  const columns = useMemo(() => otPageColumns(), [])

  const handleClearFilters = () => setForm(initialForm)

  const handleChangeDateInput = (field) => (val) => {
    setForm((prev) => ({ ...prev, [field]: val }))
  }

  const handleChangeInput = (field) => (e) => {
    let value = e.target.value
    if (field === 'released') value = e.target.checked
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearch = () => {
    if (!form.startDate || !form.endDate) return
    searchOts({
      ...form,
      startDate: form.startDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: form.endDate.format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  console.log(order)
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        bgcolor: '#f5f5f5',
      }}
    >
      {isLoading && <LoadingBackdrop open />}
      <Stack sx={{ width: '100%' }} direction="row" justifyContent="center">
        <Stack spacing={1} sx={{ maxWidth: 300, minWidth: 250, p: 2 }}>
          <Typography textAlign="center" variant="h5">
            ORDENES DE TRABAJO
          </Typography>
          <Button onClick={handleSearch}>BUSCAR</Button>
          <Button onClick={handleClearFilters}>LIMPIAR FILTROS</Button>
          <Box>
            <DatePicker
              label="FECHA INICIO"
              value={form.startDate}
              onChange={handleChangeDateInput('startDate')}
              slotProps={{
                textField: { size: 'small', fullWidth: true, margin: 'dense' },
              }}
            />
            <DatePicker
              label="FECHA FIN"
              value={form.endDate}
              onChange={handleChangeDateInput('endDate')}
              slotProps={{
                textField: { size: 'small', fullWidth: true, margin: 'dense' },
              }}
            />
            <TextField
              fullWidth
              size="small"
              label="NOMBRE"
              margin="dense"
              value={form.name}
              onChange={handleChangeInput('name')}
            />
            <TextField fullWidth size="small" label="USUARIO" margin="dense" />
            <TextField
              fullWidth
              size="small"
              label="CENTRO COSTOS"
              margin="dense"
            />
            <TextField
              fullWidth
              size="small"
              label="TIPO ORDEN DE TRABAJO"
              margin="dense"
            />
            <FormControlLabel
              label="SIN LIBERAR"
              value={form.released}
              onChange={handleChangeInput('released')}
              control={<Checkbox />}
            />
          </Box>
        </Stack>
        <CustomDataGrid
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
            },
          }}
          loading={isSearching}
          columns={columns}
          rows={ots}
          rowHeight={65}
          getRowId={(row) => row.Id}
          disableColumnSelector
          disableDensitySelector
          onRowDoubleClick={(row) => {
            openDetailDialog(row.id)
          }}
        />
      </Stack>
      <Dialog
        fullWidth
        maxWidth="md"
        open={isDialogOpen}
        onClose={closeDetailDialog}
      >
        {order && (
          <>
            <DialogTitle>No OT {order.Id}</DialogTitle>
            <DialogContent>
              <Stack
                direction="row"
                spacing={2}
                sx={{ py: 2 }}
                justifyContent="space-evenly"
              >
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="NOMBRE"
                    value={order.Nombre}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
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
                <Stack spacing={2}>
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
                    label="FECHA REPORTE"
                    value={dayjs.utc(order.FechaReporte, 'YYYY-MM-DD HH:mm:ss')}
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
                    value={dayjs.utc(order.FechaInicial, 'YYYY-MM-DD HH:mm:ss')}
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
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    size="small"
                    label="ESTATUS"
                    value={order.Estatus}
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </Stack>
                <Stack spacing={2}>
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
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  )
}
