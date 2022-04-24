import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAtomValue } from 'jotai'
import React, { useMemo, useRef } from 'react'
import { visitorsAtom, globalPositions } from '../state'
import { Instance, Instances, useGLTF } from '@react-three/drei'

const Visitor = ({ id }) => {
  const ref = useRef()
  const position = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    if (globalPositions.visitors[id]) {
      position.x = globalPositions.visitors[id].pos[0]
      position.y = globalPositions.visitors[id].pos[1] - 0.9
      position.z = globalPositions.visitors[id].pos[2]
      ref.current.position.lerp(position, 0.05)

      ref.current.rotation.x = globalPositions.visitors[id].rotation[0]
      ref.current.rotation.y = globalPositions.visitors[id].rotation[1] - 0.9
      ref.current.rotation.z = globalPositions.visitors[id].rotation[2]
    }
  })
  return (
    <group ref={ref}>
      <Instance scale={0.05} rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

const Visitors = () => {
  const visitors = useAtomValue(visitorsAtom)
  const { nodes, materials } = useGLTF('/gurka.glb')
  return (
    <group>
      <Instances
        geometry={nodes['Stereo_textured_mesh_Material0_0'].geometry}
        material={materials.Material0}
      >
        {visitors.map((id) => (
          <Visitor key={id} id={id} />
        ))}
      </Instances>
    </group>
  )
}

export default Visitors
