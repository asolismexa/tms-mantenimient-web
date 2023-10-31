import { fetchVehicleDetail } from '@/services/vehicles'
import { useState, useEffect } from 'react'

export function useVehicleDetail (vehicleId) {
  const [vehicleDetail, setVehicleDetail] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!vehicleId) return setVehicleDetail(null)
    setLoading(true)
    fetchVehicleDetail(vehicleId)
      .then((data) => setVehicleDetail(data))
      .finally(() => setLoading(false))
  }, [vehicleId])

  return { vehicleDetail, loading }
}
