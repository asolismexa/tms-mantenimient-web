import { useEffect, useState } from 'react'
import api from '@/api/api'
import { getToken } from '@/services/reports'

export default function useFetchOptions(url) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    const fetchOptions = async () => {
      try {
        const resp = await api.get(url, {
          headers: {
            Authorization: getToken(),
          },
        })

        if (active) {
          setOptions(resp.data)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchOptions()

    return () => {
      active = false
    }
  }, [loading, url])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  return { options, loading, setOpen, open }
}
