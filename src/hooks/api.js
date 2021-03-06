import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { gurkAtom } from '../state'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const useGurkor = () => {
  const [gurkor, setGurkor] = useAtom(gurkAtom)

  useEffect(() => {
    api.get('/gurkor').then((res) => {
      setGurkor(res.data.sort((a, b) => a.sort - b.sort))
    })
  }, [])

  return gurkor
}
