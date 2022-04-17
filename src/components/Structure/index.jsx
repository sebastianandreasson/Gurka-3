import { Instance, Instances, Merged, useGLTF } from '@react-three/drei'
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
const grid = generateGrid(20)

const columnPositions = grid.flatMap((row) => row)
const roofParts = 4
const roofWidth = size / roofParts
const roofPositions = grid[0]
  .map((col) => {
    return Array.from({ length: roofParts }).map((_, i) => {
      return [col[0] - roofWidth * i, col[1] + 20, col[2]]
    })
  })
  .flatMap((x) => x)

const Roof = () => {
  return (
    <Instances>
      <planeBufferGeometry args={[roofWidth * 0.8, 1500]} />
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
      <Instances geometry={nodes.Column.geometry} material={materials.default}>
        {columnPositions.map((position, index) => (
          <group key={index} position={position}>
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
