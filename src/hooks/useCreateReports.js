import { useState } from 'react'
import { postReports, uploadEvidence } from '@/services/reports'
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

  const onCreateReports = async ({ onSuccess, onFailure }) => {
    const { vehicle, driver, shipment } = formCreateReport

    if (!vehicle) {
      setCreateError('Debes selccionar una unidad')
      return
    }

    if (formCreateReport.items.length === 0) {
      setCreateError('Debes agregar al menos una falla')
      return
    }

    setLoadingCreateReport(true)
    const createdSucces = []

    for (const item of formCreateReport.items) {
      const formData = new FormData()
      formData.append('vehicle_id', vehicle.id)
      formData.append('report_type_id', item.report_type.id)
      formData.append('observation', item.observation)
      if (driver) {
        formData.append('driver_id', driver.driver_id)
      }
      if (shipment) {
        formData.append('shipment_id', shipment.shipment_id)
      }

      try {
        const reportId = (await postReports(formData)).data
        if (item.evidences.length !== 0) {
          console.log('Creating with evidences ...')
          uploadEvidence({ reportId, data: item.evidences })
        }
        createdSucces.push(reportId)
      } catch (err) {
        setCreateError(err?.message)
        if (onFailure) onFailure(err?.message)
        return
      }
    }

    if (onSuccess) onSuccess(createdSucces)
    setLoadingCreateReport(false)
    resetForms()
    setCreateError(null)
    setOpenCreateModal(false)
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
