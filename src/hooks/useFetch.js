import { useEffect, useState } from 'react'
import api from '@/api/api'

export const useFetch = (url, headers, intialState) => {
  const [data, setData] = useState(intialState)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await api.get(url, { headers })
        const data = res.data
        setData(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
      }
    }
    fetchResource()
  }, [url, headers])

  return { data, loading, error }
}
