import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Sphere } from '@react-three/drei'
import {
  DepthOfField,
  EffectComposer,
  GodRays,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction, KernelSize, Resizer } from 'postprocessing'

const Sun = ({ setMesh }) => {
  const ref = useRef()
  useEffect(() => {
    if (ref.current) {
      setMesh(ref.current)
    }
  }, [ref])
  return (
    <Sphere args={[10, 50]} ref={ref} position={[0, 30, -25]}>
      <meshBasicMaterial color="#E9EDF0" />
    </Sphere>
  )
}

const Effects = () => {
  const [lightMesh, setLightMesh] = useState()
  return (
    <Suspense fallback={null}>
      <Sun setMesh={setLightMesh} />
      <EffectComposer>
        <Noise opacity={0.025} />
        <DepthOfField
          focusDistance={0}
          focalLength={0.4}
          bokehScale={5}
          height={600}
          blendFunction={BlendFunction.Screen}
          blur={true}
        />
        <Vignette eskil={false} offset={0.00001} darkness={0.55} />
        {lightMesh && (
          <GodRays
            sun={lightMesh}
            blendFunction={BlendFunction.Screen} // The blend function of this effect.
            samples={60} // The number of samples per pixel.
            density={0.75} // The density of the light rays.
            decay={0.935} // An illumination decay factor.
            weight={0.8} // A light ray weight factor.
            exposure={0.5} // A constant attenuation coefficient.
            clampMax={1} // An upper bound for the saturation of the overall effect.
            width={Resizer.AUTO_SIZE} // Render width.
            height={Resizer.AUTO_SIZE} // Render height.
            kernelSize={KernelSize.SMALL} // The blur kernel size. Has no effect if blur is disabled.
            blur={true} // Whether the god rays should be blurred to reduce artifacts.
          />
        )}
      </EffectComposer>
    </Suspense>
  )
}

export default Effects
