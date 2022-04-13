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
  const [id, setId] = useState(null)
  const ref = useRef()
  const clicked = useRef()
  //   useEffect(() => {
  //     clicked.current = ref.current.getObjectByName(id)
  //     if (clicked.current) {
  //       clicked.current.parent.updateWorldMatrix(true, true)
  //       clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
  //       clicked.current.parent.getWorldQuaternion(q)
  //     } else {
  //       p.set(0, 0.5, 4.5)
  //       q.identity()
  //     }
  //   })
  //   useFrame((state, dt) => {
  //     state.camera.position.lerp(p, 0.025)
  //     state.camera.quaternion.slerp(q, 0.025)
  //   })
  return (
    <group
      ref={ref}
      //   onClick={(e) => (e.stopPropagation(), setId(e.object.name))}
      //   onPointerMissed={() => setId(null)}
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
      <Canvas>
        <ambientLight />
        <color attach="background" args={['#FAFAFA']} />
        <fog attach="fog" args={['#FAFAFA', 0, 15]} />
        <directionalLight position={[5, 3, 0]} />
        <Frames
          images={[
            {
              name: 'Gurban',
              position: [0, 0, 0],
              rotation: [0, 0, 0],
              url: '/gurka.jpg',
            },
            {
              name: 'Greger',
              position: [-3, 0, 0.5],
              rotation: [0, Math.PI / 8, 0],
              url: '/gurka.jpg',
            },
            {
              name: 'Gladys',
              position: [3, 0, 0.5],
              rotation: [0, -Math.PI / 8, 0],
              url: '/gurka.jpg',
            },
          ]}
        />
        <FirstPersonControls movementSpeed={2} />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  )
}

export default App
