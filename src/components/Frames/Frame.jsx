import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Image, Text, Html } from '@react-three/drei'
import styled from 'styled-components'
import { useAtom, useAtomValue } from 'jotai'
import { gurkAtom, selectedGurkAtom } from '../../state'
import Divider from './Divider'
import Podium from './Podium'

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

const LeftButton = styled.div`
  cursor: pointer;
  position: absolute;
  left: -350px;
  top: -250px;
  width: 0;
  height: 0;

  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;

  border-right: 20px solid #252525;

  @media (max-width: 768px) {
    left: -125px;
    top: -200px;

    border-top: 45px solid transparent;
    border-bottom: 45px solid transparent;
    border-right 60px solid #252525;
  }
`
const RightButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: -350px;
  top: -250px;
  width: 0;
  height: 0;

  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 20px solid #252525;

  @media (max-width: 768px) {
    right: -125px;
    top: -200px;

    border-top: 45px solid transparent;
    border-bottom: 45px solid transparent;
    border-left: 60px solid #252525;
  }
`

const Slider = ({ value, max, setValue }) => {
  const gurkor = useAtomValue(gurkAtom)
  const [name, setGurka] = useAtom(selectedGurkAtom)
  const currentIndex = gurkor.findIndex((gurk) => gurk.name === name)
  const onClick = (e, direction) => {
    e.preventDefault()
    e.stopPropagation()
    if (direction === 'left') {
      const newIndex = currentIndex === 0 ? gurkor.length - 1 : currentIndex - 1
      setGurka(gurkor[newIndex].name)
    } else {
      const newIndex = currentIndex === gurkor.length - 1 ? 0 : currentIndex + 1
      setGurka(gurkor[newIndex].name)
    }
  }

  return (
    <Html
      center
      style={{ top: 80, width: '250px' }}
      scale={0.15}
      position={[0, 0.15, 0]}
      transform
      occlude
    >
      <LeftButton onClick={(e) => onClick(e, 'left')} />
      <RightButton onClick={(e) => onClick(e, 'right')} />
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

const ASPECT_RATIO = 1.77777778
let imageCache = {}
function Frame({
  images,
  name,
  species,
  description,
  c = new THREE.Color(),
  ...props
}) {
  const selected = useAtomValue(selectedGurkAtom)
  const [autoplay, toogleAutoPlay] = useState(false)
  const [index, setIndex] = useState(images.length - 1)
  const frame = useRef()

  useEffect(() => {
    if (!images.length) return
    if (!imageCache[name]) {
      imageCache[name] = {}
    }

    const from = Math.max(0, index - 10)
    const to = Math.min(images.length, index + 10)

    for (let i = from; i < to; i++) {
      if (!imageCache[name][i]) {
        const preloadImage = new window.Image()
        preloadImage.crossOrigin = 'anonymous'
        preloadImage.src = images[i].url
        imageCache[name][i] = preloadImage
      }
    }
  }, [images, index])

  useEffect(() => {
    let interval = setInterval(() => {
      if (autoplay) {
        setIndex((index) => (index + 1) % images.length)
      }
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [autoplay, images, index])

  return (
    <group {...props}>
      <mesh position={[0, 0.9, -0.25]}>
        <boxBufferGeometry args={[4, 3, 0.25]} />
        <meshStandardMaterial color="#FAFAFA" />
      </mesh>
      <Divider position={[-1.25, 0, 0.75]} length={2.5} />
      <Podium onClick={() => toogleAutoPlay(!autoplay)} />
      <mesh
        name={name}
        castShadow
        scale={[1, ASPECT_RATIO, 0.05]}
        position={[0, ASPECT_RATIO / 2 + 0.25, 0]}
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
        <Suspense fallback={null}>
          <Image
            raycast={() => null}
            position={[0, 0, 0.7]}
            scale={[0.9, 0.93, 1]}
            url={
              imageCache[name] && imageCache[name][index]
                ? imageCache[name][index].src
                : images[index].url
            }
          />
        </Suspense>
      </mesh>
      {selected && selected === name && (
        <Slider value={index} setValue={setIndex} max={images.length - 1} />
      )}
      <Text
        maxWidth={1}
        anchorX="left"
        anchorY="top"
        position={[-0.15, 0.3, 0.03]}
        fontSize={0.03}
        font="/fonts/Inter-Thin.woff"
        color="#FFF"
      >
        {images[index].date.slice(0, 19).replace('T', ' ')}
      </Text>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, ASPECT_RATIO, 0]}
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
        position={[0.55, ASPECT_RATIO - 0.225, 0]}
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
        position={[0.55, ASPECT_RATIO - 0.355, 0]}
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
