import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Frame from './components/Frame'
import * as THREE from 'three'
import {
  Environment,
  Lightformer,
  Float,
  useGLTF,
  BakeShadows,
  ContactShadows,
  MeshReflectorMaterial,
  FirstPersonControls,
  FlyControls,
} from '@react-three/drei'
import { LayerMaterial, Color, Depth } from 'lamina'
import Cucumber from './components/Cucumber'
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import Page from './Page'

const GOLDENRATIO = 1.61803398875

function MovingSpots({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef()
  useFrame(
    (state, delta) =>
      (group.current.position.z += delta * 15) > 60 &&
      (group.current.position.z = -60)
  )
  return (
    <group rotation={[0, 0.5, 0]}>
      <group ref={group}>
        {positions.map((x, i) => (
          <Lightformer
            form="circle"
            intensity={4}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, 4, i * 4]}
            scale={[3, 1, 1]}
          />
        ))}
      </group>
    </group>
  )
}

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const [id, setId] = useState('Greger')
  const ref = useRef()
  const clicked = useRef()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 1, 4)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    state.camera.position.lerp(p, 0.025)
    state.camera.quaternion.slerp(q, 0.025)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setId(e.object.name))}
      onPointerMissed={() => setId(null)}
    >
      {images.map((props) => (
        <Frame key={props.url} {...props} />
      ))}
    </group>
  )
}

const App = () => {
  return (
    <div id="canvas">
      <Canvas shadows>
        <ambientLight />
        <directionalLight
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
        />
        <color attach="background" args={['#FAFAFA']} />
        <fog attach="fog" args={['#FAFAFA', 0, 40]} />
        <group position={[0, -0.15, 0]}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
              blur={[400, 100]}
              resolution={2048}
              mixBlur={1.1}
              mixStrength={5}
              roughness={0.6}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color="#FAFAFA"
              metalness={0.85}
            />
          </mesh>
        </group>
        <Cucumber />
        <Frames
          images={[
            {
              name: 'Gurban',
              species: 'Telegraph Improved',
              description:
                'Good crops of traditional flavour.\nLong dark fruits.',
              position: [0, 0, 0],
              rotation: [0, 0, 0],
              url: '/gurka.jpg',
            },
            {
              name: 'Greger',
              species: 'Cornichon de Paris',
              description:
                'French heirloom for masses of mini "cornichons".\nCrunchy texture and sweet flavour.',
              position: [-3, 0, 0.5],
              rotation: [0, Math.PI / 8, 0],
              url: '/gurka.jpg',
            },
            {
              name: 'Gladys',
              species: 'Emilie F1',
              description:
                'Prolific all female variety with smooth-skinned cues.\nResistant to many diseases including cucumber mosaic virus.',
              position: [3, 0, 0.5],
              rotation: [0, -Math.PI / 8, 0],
              url: '/gurka.jpg',
            },
          ]}
        />
        {/* <FirstPersonControls movementSpeed={2} /> */}
        <Environment preset="warehouse" />
        {/* <ContactShadows
          resolution={1024}
          frames={1}
          position={[0, 0, 0]}
          scale={2}
          blur={1.5}
          opacity={1}
          far={10}
        /> */}
        <EffectComposer>
          <Noise opacity={0.035} />
          <Vignette eskil={false} offset={0.00001} darkness={0.75} />
          {/* <DepthOfField
            focusDistance={0}
            focalLength={0.02}
            bokehScale={2}
            height={480}
          /> */}
        </EffectComposer>
      </Canvas>
      <Page />
    </div>
  )
}

export default App
