import {
  changeDetailTab,
  changeOrderStatus,
  closeDetail,
  openDetail,
} from '@/reducers/ordersSlice'
import { getOrderDetail, updateOrderStatus } from '@/services/ot.service'
import { Button } from '@mui/material'
import { AxiosError } from 'axios'
import { closeSnackbar, enqueueSnackbar } from 'notistack'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

/**
 * Custom hook for managing order details.
 */
export function useOrderDetail() {
  const state = useSelector((state) => state.orders)
  const dispatch = useDispatch()
  const order = state.order
  const tab = state.detailTab
  const isDialogOpen = state.isDetailOpen
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const openDialog = async (orderId) => {
    setIsLoading(true)
    try {
      const data = await getOrderDetail(orderId)
      dispatch(openDetail(data))
    } catch (err) {
      console.error(err)
      let message = 'Error al consultar OT'
      if (err instanceof AxiosError) {
        message = err.response.data
      }
      enqueueSnackbar(message, {
        variant: 'error',
        autoHideDuration: 1000,
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  const closeDialog = () => {
    dispatch(closeDetail())
  }

  const changeTab = (index) => {
    dispatch(changeDetailTab(index))
  }

  const updateStatus = async (newStatus) => {
    const prevStatus = order.EstatusId
    dispatch(changeOrderStatus(newStatus))
    setIsSaving(true)
    try {
      await updateOrderStatus({
        orderId: order.Id,
        statusId: newStatus,
      })
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError) {
        dispatch(changeOrderStatus(prevStatus))
        enqueueSnackbar(error.response.data, {
          variant: 'error',
          hideIconVariant: 'default',
          autoHideDuration: 6000,
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'top',
          },
          action: (id) => (
            <>
              <Button variant="outlined" onClick={() => closeSnackbar(id)}>
                Cerrar
              </Button>
            </>
          ),
        })
      }
    } finally {
      setIsSaving(false)
    }
  }

  return {
    tab,
    order,
    isSaving,
    isLoading,
    isDialogOpen,
    changeTab,
    openDialog,
    closeDialog,
    updateStatus,
  }
}
