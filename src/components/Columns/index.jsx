import React from 'react'
import ColumnModel from './model'

const placeInGrid = (width, size = 20) => {
  let grid = []
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      const offset = ((width - 1) * size) / 2
      grid.push([-offset + x * size, 0, -offset + y * size])
    }
  }
  return grid
}
const positions = placeInGrid(10)

const Columns = () => {
  return (
    <>
      {positions.map((position, index) => (
        <ColumnModel key={index} position={position} />
      ))}
      {/* <ColumnModel key={1254123123} position={[0, 0, 1]} /> */}
    </>
  )
}

export default Columns
