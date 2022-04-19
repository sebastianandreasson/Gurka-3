import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAtomValue } from 'jotai'
import React, { useEffect, useMemo, useRef } from 'react'
import { visitorsAtom, globalPositions } from '../state'
import Cucumber from './Cucumber'
import { useSocket } from '../hooks/socket'

const Visitor = ({ id }) => {
  const ref = useRef()
  const position = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    if (globalPositions.visitors[id]) {
      position.x = globalPositions.visitors[id][0]
      position.y = globalPositions.visitors[id][1] - 1
      position.z = globalPositions.visitors[id][2]
      ref.current.position.lerp(position, 0.05)
    }
  })
  return (
    <group ref={ref} scale={0.5}>
      <Cucumber scale={0.1} rotation={[0, 0, Math.PI / 2]} />
    </group>
  )
}

const Visitors = () => {
  useSocket()
  const visitors = useAtomValue(visitorsAtom)
  return (
    <group>
      {visitors.map((id) => (
        <Visitor key={id} id={id} />
      ))}
    </group>
  )
}

export default Visitors
