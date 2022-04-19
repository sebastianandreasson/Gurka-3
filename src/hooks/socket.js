import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { globalPositions, visitorsAtom } from '../state'

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ['websocket'],
})

export const useSocket = () => {
  const [visitors, setVisitors] = useAtom(visitorsAtom)

  useEffect(() => {
    socket.on('visitors', (ids) => {
      console.log('socket.visitors', ids)
      setVisitors((s) => [...s, ...ids])
    })
    socket.on('visitor', (id) => {
      console.log('socket.visitor', id)
      setVisitors((s) => [...s, id])
    })

    socket.on('visitor-disconnect', (id) => {
      console.log('socket.visitor-disconnect', id)
      setVisitors((s) => s.filter((v) => v !== id))
    })
  }, [])

  useEffect(() => {
    if (!socket || !visitors) return
    socket.on('pos', ({ id, pos }) => {
      globalPositions.visitors[id] = pos
    })
  }, [socket, visitors])

  return socket
}
