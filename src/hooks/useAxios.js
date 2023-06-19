import { useState, useEffect } from 'react'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env['VITE_BASE_API_URL']

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setloading] = useState(true)

  useEffect(() => {
    axios[method](url, {}, {})
      .then((res) => {
        setResponse(res.data)
      })
      .catch((err) => {
        setError(err)
      })
      .finally(() => {
        setloading(false)
      })
  }, [method, url, body, headers])

  return { response, error, loading }
}

export default useAxios
