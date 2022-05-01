import { useAtom, useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { globalPositions, visitorsAtom } from '../state'

const socket = io(import.meta.env.VITE_API_URL, {
  transports: ['websocket'],
})

export const useSocket = () => {
  const [visitors, setVisitors] = useAtom(visitorsAtom)

  useEffect(() => {
    socket.emit('activated')

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

    return () => {
      socket.emit('deactivated')
      socket.off('visitors')
      socket.off('visitor')
      socket.off('visitor-disconnect')
    }
  }, [])

  useEffect(() => {
    if (!socket || !visitors) return
    socket.on('pos', ({ id, pos, rotation }) => {
      globalPositions.visitors[id] = { pos, rotation }
    })

    return () => {
      socket.off('pos')
    }
  }, [socket, visitors])

  return socket
}
