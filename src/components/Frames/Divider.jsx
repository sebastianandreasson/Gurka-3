import React, { useRef } from 'react'
import * as THREE from 'three'

const footCylinderGeometry = new THREE.CylinderBufferGeometry(
  0.04,
  0.04,
  0.015,
  32
)
const smallCylinderGeometry = new THREE.CylinderBufferGeometry(
  0.02,
  0.02,
  0.5,
  32
)
const metalMaterial = new THREE.MeshStandardMaterial({
  color: '#FAFAFA',
  metalness: 1,
  roughness: 0.2,
})
const ropeMaterial = new THREE.MeshStandardMaterial({
  color: '#5C0A12',
  metalness: 0.1,
  roughness: 1,
})

const Foot = (props) => {
  return (
    <group {...props}>
      <mesh geometry={smallCylinderGeometry} material={metalMaterial} />
      <mesh
        geometry={footCylinderGeometry}
        material={metalMaterial}
        position={[0, -0.075, 0]}
      />
    </group>
  )
}

export default function Divider(props) {
  const group = useRef()
  const length = props.length ? props.length : 1
  const offset = 0.75
  return (
    <>
      <group ref={group} {...props} dispose={null} castShadow receiveShadow>
        <Foot length={length} />
        <Foot position={[length, 0, -offset]} length={length} />
        <Foot position={[0, 0, -offset]} length={length} />
        <Foot position={[length, 0, 0]} length={length} />
        <mesh position={[length * 0.5, 0.2, 0]} material={ropeMaterial}>
          <boxBufferGeometry args={[length, 0.05, 0.005]} />
        </mesh>
        <mesh
          position={[length, 0.2, -offset / 2]}
          rotation={[0, -Math.PI / 2, 0]}
          material={ropeMaterial}
        >
          <boxBufferGeometry args={[offset, 0.05, 0.005]} />
        </mesh>
        <mesh
          position={[0, 0.2, -offset / 2]}
          rotation={[0, -Math.PI / 2, 0]}
          material={ropeMaterial}
        >
          <boxBufferGeometry args={[offset, 0.05, 0.005]} />
        </mesh>

        {props.full && (
          <mesh position={[length * 0.5, 0.2, -offset]} material={ropeMaterial}>
            <boxBufferGeometry args={[length, 0.05, 0.005]} />
          </mesh>
        )}
      </group>
    </>
  )
}
