import * as THREE from 'three'
import {
  BakeShadows,
  Instance,
  Instances,
  Merged,
  useGLTF,
} from '@react-three/drei'
import React from 'react'
import ColumnModel from './ColumnModel'

const size = 20
const generateGrid = (width) => {
  let arr = []
  for (let y = 0; y < width; y++) {
    arr.push([])
    for (let x = 0; x < width; x++) {
      const offset = ((width - 1) * size) / 2
      arr[y].push([-offset + x * size, 0, -offset + y * size])
    }
  }
  return arr
}
const grid = generateGrid(10)

const columnPositions = grid.flatMap((row) => row)
const roofParts = 3
const roofWidth = size / roofParts
const roofPositions = grid[0]
  .map((col) => {
    return Array.from({ length: roofParts * 10 }).map((_, i) => {
      return [col[0] - roofWidth * i, col[1] + 20, col[2]]
    })
  })
  .flatMap((x) => x)
const roofGeometry = new THREE.PlaneBufferGeometry(roofWidth * 0.7, 1500)

const Roof = () => {
  return (
    <Instances castShadow geometry={roofGeometry} position={[100, 0, 0]}>
      {/* <meshStandardMaterial color="#FAFAFA" opacity={0.01} transparent /> */}
      <meshStandardMaterial color="#FAFAFA" />
      {roofPositions.map((pos, i) => (
        <Instance
          position={pos}
          rotation={[Math.PI / 2, 0, 0]}
          key={`Roof_${i}`}
        />
      ))}
    </Instances>
  )
}

const Structure = () => {
  const { nodes, materials } = useGLTF('/column2.glb')
  return (
    <>
      <Instances
        geometry={nodes.Column.geometry}
        material={materials.default}
        castShadow
        receiveShadow
      >
        {columnPositions.map((position, index) => (
          <group key={index} position={position} castShadow>
            <Instance
              key={index}
              position={[0, 10, 0]}
              scale={[0.1, 0.135, 0.1]}
            />
          </group>
        ))}
      </Instances>
      <Roof />
    </>
  )
}

useGLTF.preload('/column2.glb')

export default Structure
