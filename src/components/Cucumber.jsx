import * as THREE from 'three'
import React, { useRef } from 'react'
import { ContactShadows, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Cucumber({ ...props }) {
  const group = useRef()
  const ref = useRef()
  const { nodes, materials } = useGLTF('/cucumber/scene.gltf')

  useFrame((state) => {
    ref.current.rotation.x += 0.015
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y + 0.1,
      Math.sin(state.clock.elapsedTime) / 25,
      0.5
    )
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={ref} rotation={[0, Math.PI / 2, 0]} scale={1}>
        <mesh
          castShadow
          geometry={nodes.Stereo_textured_mesh_Material0_0.geometry}
          material={materials.Material0}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/cucumber/scene.gltf')
