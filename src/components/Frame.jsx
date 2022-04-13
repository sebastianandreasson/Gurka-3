import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor, Image, Text, ContactShadows } from '@react-three/drei'

const GOLDENRATIO = 1.61803398875

function Frame({ url, name, c = new THREE.Color(), ...props }) {
  const [hovered, hover] = useState(false)
  const image = useRef()
  const frame = useRef()
  useCursor(hovered)
  useFrame(() => {
    image.current.scale.x = THREE.MathUtils.lerp(
      image.current.scale.x,
      0.85 * (hovered ? 0.85 : 1),
      0.1
    )
    image.current.scale.y = THREE.MathUtils.lerp(
      image.current.scale.y,
      0.9 * (hovered ? 0.905 : 1),
      0.1
    )
  })

  return (
    <group {...props}>
      <mesh
        name={name}
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.9}
          roughness={0.8}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
      <ContactShadows
        resolution={1024}
        frames={1}
        position={[
          props.position[0],
          props.position[1] - 0.15,
          props.position[2],
        ]}
        scale={6}
        blur={2.5}
        opacity={1}
        far={10}
      />
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.2}
        font="/fonts/Inter-Black.woff"
        color="#151515"
      >
        {name}
      </Text>
      <Text
        maxWidth={1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO - 0.225, 0]}
        fontSize={0.09}
        font="/fonts/Inter-ThinItalic.woff"
        color="#151515"
      >
        Telegraph improved
      </Text>
    </group>
  )
}

export default Frame
