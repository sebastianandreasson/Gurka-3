import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, MeshReflectorMaterial } from '@react-three/drei'
import Cucumber from './components/Cucumber'

import Page from './Page'
import { useAtomValue } from 'jotai'
import { colorAtom, exploringAtom } from './state'
import { Player } from './components/Player'
import { Physics, usePlane } from '@react-three/cannon'
import Frames from './components/Frames'
import Fog from './components/Fog'
import Effects from './Effects'
import Structure from './components/Structure'
import { Perf } from 'r3f-perf'

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
          depthScale={2}
          minDepthThreshold={0.45}
          maxDepthThreshold={1.5}
          // color={props.color}
          color="#E9EDF0"
          metalness={0.75}
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
        <Perf />
        <ambientLight color={color} />
        <directionalLight
          color={color}
          castShadow
          shadow-mapSize-height={1024}
          shadow-mapSize-width={1024}
        />
        <Fog color={color} />
        <color attach="background" args={[color]} />
        <Cucumber scale={0.05} position={[-0.25, 0.15, 2]} />
        <Cucumber position={[-5, 2, 10]} />
        <Frames />
        <Structure />
        <Physics>
          {exploring && <Player />}
          <Ground color={color} />
        </Physics>
        <Environment preset="park" />
        <Effects />
      </Canvas>
      <Page />
    </div>
  )
}

export default App
