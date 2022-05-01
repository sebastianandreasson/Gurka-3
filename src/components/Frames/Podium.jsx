import React, { useRef } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

const buttonMaterial = new THREE.MeshStandardMaterial({
  color: '#6F0B0B',
  metalness: 0.4,
  roughness: 1,
})
const buttonGeometry = new THREE.CylinderBufferGeometry(0.065, 0.075, 0.025, 16)
const podiumColor = new THREE.Color('#757575')

export default function Podium(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/podium.glb')
  materials['02___Default'].color = podiumColor
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      rotation={[0, -Math.PI, 0]}
      position={[0.9, -0.1, 1.25]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Podium.geometry}
        material={materials['02___Default']}
        scale={[0.01, 0.01, 0.01]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        rotation={[-Math.PI / 7, 0, 0]}
        position={[0, 0.675, 0.15]}
        onClick={props.onClick}
        material={buttonMaterial}
        geometry={buttonGeometry}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload('/podium.glb')
