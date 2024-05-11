import {
  changeDetailTab,
  closeDetail,
  openDetail,
} from '@/reducers/ordersSlice'
import { getOrderDetail } from '@/services/ot.service'
import { AxiosError } from 'axios'
import { enqueueSnackbar } from 'notistack'
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

  return {
    tab,
    order,
    isLoading,
    isDialogOpen,
    changeTab,
    openDialog,
    closeDialog,
  }
}
