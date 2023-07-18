import { useEffect, useState } from 'react'
import { getVehicleById } from '@/services/vehicles'

export const useFetchVehicle = (vehicleId) => {
  const [vehicle, setVehicle] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await getVehicleById(vehicleId)
        if (response.status === 200) {
          setVehicle(response?.data?.vehicle)
        } else {
          throw new Error('Error fetching vehicle')
        }
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchVehicle()
  }, [vehicleId])

  return { vehicle, error, loading }
}
