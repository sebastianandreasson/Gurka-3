import React from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  MeshReflectorMaterial,
  PointerLockControls,
} from '@react-three/drei'
import Cucumber from './components/Cucumber'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import Page from './Page'
import { useAtom, useAtomValue } from 'jotai'
import { exploringAtom } from './state'
import { Player } from './components/Player'
import { Physics, usePlane } from '@react-three/cannon'
import Frames from './components/Frames'

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
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={2048}
          mixBlur={1.2}
          mixStrength={3}
          roughness={0.75}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#FAFAFA"
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}

const App = () => {
  const exploring = useAtomValue(exploringAtom)
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
        <Cucumber />
        <Frames />
        <Physics>
          {exploring && <Player />}
          <Ground />
        </Physics>
        <Environment preset="park" />
        <EffectComposer>
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.00001} darkness={0.75} />
        </EffectComposer>
      </Canvas>
      <Page />
    </div>
  )
}

export default App
