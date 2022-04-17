import { useTexture } from '@react-three/drei'
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
    <group>
      {roofPositions.map((pos) => (
        <mesh position={pos} rotation={[Math.PI / 2, 0, 0]}>
          <planeBufferGeometry args={[roofWidth * 0.8, 1500]} />
          <meshStandardMaterial color="#FAFAFA" />
        </mesh>
      ))}
    </group>
  )
}

const Structure = () => {
  return (
    <>
      {columnPositions.map((position, index) => (
        <ColumnModel key={index} position={position} />
      ))}
      <Roof />
    </>
  )
}

export default Structure
