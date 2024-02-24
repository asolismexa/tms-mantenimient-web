import { useCallback, useState } from 'react'
import * as service from '@/services/ot.service'

export function useSearchOTs() {
  const [ots, setOts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const searchOts = useCallback(async () => {
    setLoading(true)
    try {
      const resp = await service.searchOts()
      setOts(resp.data)
      return resp.data
    } catch (error) {
      console.log('Error fetching', error)
      setError(error)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  return { ots, loading, error, setOts, searchOts }
}
