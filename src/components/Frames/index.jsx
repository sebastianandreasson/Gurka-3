import React, { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import Frame from './Frame'
import * as THREE from 'three'
import { useAtom, useAtomValue } from 'jotai'
import { exploringAtom, selectedGurkAtom } from '../../state'
import { useGurkor } from '../../hooks/api'
import { isMobile } from '../../utils'
import { BakeShadows } from '@react-three/drei'

const ASPECT_RATIO = 1.77777778

const EmptyWall = (props) => {
  return (
    <group {...props}>
      <mesh position={[0, 0.9, -0.25]}>
        <boxBufferGeometry args={[4, 3, 0.25]} />
        <meshStandardMaterial color="#FAFAFA" />
      </mesh>
    </group>
  )
}

function Frames({ q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
  const lerpSpeed = useMemo(() => (isMobile() ? 0.1 : 0.025))
  const exploring = useAtomValue(exploringAtom)
  const gurkor = useGurkor()
  const [id, setId] = useAtom(selectedGurkAtom)
  const ref = useRef()
  const clicked = useRef()
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(id)
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true)
      if (isMobile()) {
        clicked.current.parent.localToWorld(p.set(0, ASPECT_RATIO / 2, 4))
      } else {
        clicked.current.parent.localToWorld(p.set(0, ASPECT_RATIO / 2, 1.5))
      }
      clicked.current.parent.getWorldQuaternion(q)
    } else {
      p.set(0, 1, 0)
      q.identity()
    }
  })
  useFrame((state, dt) => {
    if (!exploring) state.camera.position.lerp(p, lerpSpeed)
    if (!exploring) state.camera.quaternion.slerp(q, lerpSpeed)
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
      {gurkor.length && <BakeShadows />}
      {!gurkor.length && (
        <>
          <EmptyWall position={[0, 0, -8]} />
        </>
      )}
    </group>
  )
}

export default Frames
