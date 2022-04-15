import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/column.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Line01.geometry} material={materials['default']} />
      <mesh geometry={nodes.Plane01.geometry} material={materials['default']} />
      <mesh geometry={nodes.Box01.geometry} material={materials['default']} />
      <mesh geometry={nodes.Box02.geometry} material={materials['default']} />
    </group>
  )
}

useGLTF.preload('/column.glb')
