import { useState } from 'react'
import axios from 'axios'
import { postReports } from '@/services/reports'
import { v4 as uuid } from 'uuid'

export const useCreateReports = ({
  createFormInitialState,
  addItemFormInitialState,
}) => {
  const [createError, setCreateError] = useState(null)
  const [loadingCreateReport, setLoadingCreateReport] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openAddItemModal, setOpenAddItemModal] = useState(false)
  const [formCreateReport, setFormCreateReport] = useState(
    createFormInitialState,
  )
  const [formAddItem, setFormAddItem] = useState(addItemFormInitialState)

  const resetForms = () => {
    setFormCreateReport(createFormInitialState)
    setFormAddItem(addItemFormInitialState)
  }

  const onOpenAddItemModal = () => {
    setOpenAddItemModal(true)
  }
  const closeAddReportItemModal = () => {
    setOpenAddItemModal(false)
    setFormAddItem(addItemFormInitialState)
  }
  const onAddReportItem = () => {
    if (!formAddItem.observation.trim()) {
      setFormAddItem((prev) => ({
        ...prev,
        error: 'Debes escribir una observación',
      }))
      return
    }

    if (!formAddItem.type) {
      setFormAddItem((prev) => ({
        ...prev,
        error: 'Debes seleccionar un tipo de falla',
      }))
      return
    }

    setFormCreateReport((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: uuid(),
          report_type: formAddItem.type,
          observation: formAddItem.observation,
          evidences: formAddItem.evidences,
        },
      ],
    }))
    closeAddReportItemModal()
    setOpenAddItemModal(false)
  }
  const onDeleteReportItem = (id) => {
    setFormCreateReport((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }
  const onOpenCreateReportsModal = ({ vehicle }) => {
    setOpenCreateModal(true)
    console.log(vehicle)
    if (!vehicle) return
    setFormCreateReport((prev) => ({ ...prev, vehicle }))
  }
  const onCloseCreateReportsModal = () => {
    setOpenCreateModal(false)
    setFormCreateReport(createFormInitialState)
    setCreateError(null)
  }
  const onCreateReports = ({ onSuccess, onFailure }) => {
    const { vehicle, driver, shipment } = formCreateReport
    const location = {
      lat: null,
      lon: null,
    }

    if (!vehicle) {
      setCreateError('Debes selccionar una unidad')
      return
    }

    if (formCreateReport.items.length === 0) {
      setCreateError('Debes agregar al menos una falla')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        location.lat = position.coords.latitude
        location.lon = position.coords.longitude

        const data = []
        for (const item of formCreateReport.items) {
          const formData = new FormData()
          formData.append('vehicle_id', vehicle.id)
          formData.append('report_type_id', item.report_type.id)
          formData.append('observation', item.observation)
          formData.append('lat', location.lat.toString())
          formData.append('lon', location.lon.toString())
          if (driver) {
            formData.append('driver_id', driver.driver_id)
          }
          if (shipment) {
            formData.append('shipment_id', shipment.shipment_id)
          }

          for (const evidence of item.evidences) {
            formData.append(evidence.name, evidence)
          }

          data.push(formData)
        }

        setLoadingCreateReport(true)
        axios
          .all(data.map((formData) => postReports(formData)))
          .then((resp) => {
            resetForms()
            setCreateError(null)
            setOpenCreateModal(false)
            if (onSuccess) onSuccess(resp)
          })
          .catch((err) => {
            setCreateError(err)
            if (onFailure) onFailure(err)
          })
          .finally(() => {
            setLoadingCreateReport(false)
          })
      },
      (error) => {
        console.log(error)
      },
    )
  }

  return {
    formCreateReport,
    setFormCreateReport,
    formAddItem,
    setFormAddItem,
    loadingCreateReport,
    openCreateModal,
    openAddItemModal,
    onOpenAddItemModal,
    closeAddReportItemModal,
    onAddReportItem,
    onDeleteReportItem,
    onOpenCreateReportsModal,
    onCloseCreateReportsModal,
    onCreateReports,
    createError,
  }
}
