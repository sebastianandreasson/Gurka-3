import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor, Image, Text, Html } from '@react-three/drei'
import styled from 'styled-components'
import { useAtomValue } from 'jotai'
import { selectedGurkAtom } from '../../state'

const SliderInput = styled.input`
  appearance: none;
  width: 100%;
  height: 6px;
  background: #fafafa;
  outline: none;
  border-radius: 2px;

  ::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #252525;
    border-radius: 8px;
    cursor: pointer;
  }
`

const Slider = ({ value, max, setValue }) => {
  return (
    <Html
      center
      style={{ top: 80, width: '250px' }}
      scale={0.15}
      position={[0, -0.05, 0.025]}
      transform
      occlude
    >
      <SliderInput
        background="#252525"
        type="range"
        min={1}
        max={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></SliderInput>
    </Html>
  )
}

const GOLDENRATIO = 1.61803398875
function Frame({
  images,
  name,
  species,
  description,
  c = new THREE.Color(),
  ...props
}) {
  const selected = useAtomValue(selectedGurkAtom)
  const [hovered, hover] = useState(false)
  const [index, setIndex] = useState(1)
  const image = useRef()
  const frame = useRef()
  useCursor(hovered)
  useFrame(() => {
    image.current.scale.x = THREE.MathUtils.lerp(
      image.current.scale.x,
      0.85 * (hovered ? 0.9 : 1),
      0.1
    )
    image.current.scale.y = THREE.MathUtils.lerp(
      image.current.scale.y,
      0.9 * (hovered ? 0.955 : 1),
      0.1
    )
  })

  return (
    <group {...props}>
      <mesh
        name={name}
        castShadow
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#252525"
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
          url={images[index - 1].url}
        />
      </mesh>
      {selected && selected === name && (
        <Slider value={index} setValue={setIndex} max={images.length} />
      )}
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
        {species}
      </Text>
      <Text
        maxWidth={1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO - 0.355, 0]}
        fontSize={0.04}
        font="/fonts/Inter-ThinItalic.woff"
        color="#151515"
      >
        {description}
      </Text>
    </group>
  )
}

export default Frame
