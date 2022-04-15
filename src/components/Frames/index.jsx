import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Frame from './Frame'
import * as THREE from 'three'
import { useAtom, useAtomValue } from 'jotai'
import { exploringAtom, gurkAtom, selectedGurkAtom } from '../../state'

const GOLDENRATIO = 1.61803398875

function Frames({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const exploring = useAtomValue(exploringAtom)
  const gurkor = useAtomValue(gurkAtom)
  const [id, setId] = useAtom(selectedGurkAtom)
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
    if (!exploring) state.camera.position.lerp(p, 0.025)
    if (!exploring) state.camera.quaternion.slerp(q, 0.025)
  })
  return (
    <group
      ref={ref}
      onClick={(e) => (e.stopPropagation(), setId(e.object.name))}
      onPointerMissed={() => setId(null)}
    >
      {gurkor.map((props) => (
        <Frame key={props.name} {...props} />
      ))}
    </group>
  )
}

export default Frames
