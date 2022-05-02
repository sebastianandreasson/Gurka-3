import React, { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  AdaptiveDpr,
  Environment,
  MeshReflectorMaterial,
} from '@react-three/drei'
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
import Visitors from './components/Visitors'
import Divider from './components/Frames/Divider'
import { isMobile } from './utils'

export const Ground = (props) => {
  const resolution = useMemo(() => (isMobile() ? 256 : 512))
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
          resolution={resolution}
          mixBlur={1.2}
          mixStrength={2}
          roughness={0.75}
          depthScale={2}
          minDepthThreshold={0.45}
          maxDepthThreshold={1.5}
          color="#E9EDF0"
          metalness={0.4}
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
      <Canvas shadows performance={{ min: 0.25, max: 1, current: 0.5 }} dpr={1}>
        <ambientLight intensity={0.9} color={color} />
        <group>
          <spotLight
            castShadow
            intensity={5}
            angle={0.1}
            position={[-200, 220, -100]}
            shadow-mapSize={[256, 256]}
            shadow-bias={-0.000001}
            color="#E87B38"
          />
          <spotLight
            angle={0.1}
            position={[-250, 120, -200]}
            intensity={1}
            castShadow
            shadow-mapSize={[50, 50]}
            shadow-bias={-0.000001}
            color="#E87B38"
          />
          <spotLight
            angle={0.1}
            position={[250, 120, 200]}
            intensity={1}
            castShadow
            shadow-mapSize={[50, 50]}
            shadow-bias={-0.000001}
            color="#E94F37"
          />
        </group>
        <Fog color={color} />
        <color attach="background" args={[color]} />
        <group position={[0, 0, 8]}>
          <Cucumber position={[-0.25, 0, -2]} scale={0.05} />
          <Divider position={[-0.35, 0, -1.75]} scale={0.75} full short />
        </group>
        <Frames />
        <Structure />
        <Physics>
          {exploring && <Player />}
          <Ground color={color} />
        </Physics>
        <Visitors />
        <Environment preset="park" />
        <Effects />
        <AdaptiveDpr pixelated />
      </Canvas>
      <Page />
    </div>
  )
}

export default App
