import * as THREE from 'three'
import React, { useEffect } from 'react'

const Fog = ({ color }) => {
  useEffect(() => {
    THREE.ShaderChunk.fog_fragment = `
      #ifdef USE_FOG
        vec3 fogOrigin = cameraPosition;
        vec3 fogDirection = normalize(vWorldPosition - fogOrigin);
        float fogDepth = distance(vWorldPosition, fogOrigin);

        float heightFactor = 0.025;
        float fogFactor = exp(-fogOrigin.y * fogDensity) * (
          1.0 - exp(-fogDepth * -fogDirection.y * fogDensity)) / -fogDirection.y;
        fogFactor = fogFactor * heightFactor;

        fogFactor = saturate(fogFactor);

        gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
      #endif`

    THREE.ShaderChunk.fog_pars_fragment = `
      #ifdef USE_FOG
        uniform vec3 fogColor;
        varying vec3 vWorldPosition;
        #ifdef FOG_EXP2
          uniform float fogDensity;
        #else
          uniform float fogNear;
          uniform float fogFar;
        #endif
      #endif`

    THREE.ShaderChunk.fog_vertex = `
      #ifdef USE_FOG
        vWorldPosition = worldPosition.xyz;
      #endif`

    THREE.ShaderChunk.fog_pars_vertex = `
      #ifdef USE_FOG
        varying vec3 vWorldPosition;
      #endif`
  }, [])
  return (
    <>
      {/* <fog attach="fog" args={[color, 1, 150]} /> */}
      <fogExp2 attach="fog" args={[color, 0.15]} />
    </>
  )
}

export default Fog
