import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function ColumnModel() {
  const { nodes, materials } = useGLTF('/column.glb')
  return (
    <group
      position={[0, 10.25, 0]}
      scale={[0.05, 0.125, 0.05]}
      castShadow
      dispose={null}
    >
      <mesh geometry={nodes.Line01.geometry} material={materials['default']} />
      <mesh geometry={nodes.Box01.geometry} material={materials['default']} />
      <mesh geometry={nodes.Box02.geometry} material={materials['default']} />
    </group>
  )
}

useGLTF.preload('/column.glb')
