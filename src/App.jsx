import React from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  MeshReflectorMaterial,
  PointerLockControls,
  SpotLight,
} from '@react-three/drei'
import Cucumber from './components/Cucumber'
import {
  EffectComposer,
  Noise,
  SSAO,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import Page from './Page'
import { useAtom, useAtomValue } from 'jotai'
import { colorAtom, exploringAtom } from './state'
import { Player } from './components/Player'
import { Physics, usePlane } from '@react-three/cannon'
import Frames from './components/Frames'
import Column from './components/Columns'
import Fog from './components/Fog'

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <group position={[0, -0.075, 0]}>
      <mesh
        ref={ref}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[500, 500]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={2048}
          mixBlur={1.2}
          mixStrength={2}
          roughness={0.75}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          // color={props.color}
          color="#E9EDF0"
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}

const App = () => {
  const exploring = useAtomValue(exploringAtom)
  const color = useAtomValue(colorAtom)

  return (
    <div id="canvas">
      <Canvas shadows>
        <ambientLight color={color} />
        <directionalLight
          color={color}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
        />
        {/* <SpotLight
          castShadow
          position={[0, 5, 0]}
          distance={7.5}
          angle={0.25}
          attenuation={7.5}
          anglePower={5} // Diffuse-cone anglePower (default: 5)
          intensity={0.0}
          color={'#FFBA08'}
        /> */}
        <Fog color={color} />
        <color attach="background" args={[color]} />
        <Cucumber scale={0.05} position={[-0.15, 0.15, 2]} />
        <Cucumber position={[-5, 2, 10]} />
        <Frames />
        <Column />
        <Physics>
          {exploring && <Player />}
          <Ground color={color} />
        </Physics>
        <Environment preset="park" />
        <EffectComposer>
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.00001} darkness={0.55} />
        </EffectComposer>
      </Canvas>
      <Page />
    </div>
  )
}

export default App
