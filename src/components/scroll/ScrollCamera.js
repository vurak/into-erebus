import * as THREE from "three"
import React, { useRef, useContext, useEffect } from "react"
import { PerspectiveCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import Particles from "../particles/Particles"

import DepthContext from "../../context/DepthContext"
import ScrollContext from "../../context/ScrollContext"
import TargetContext from "../../context/TargetContext"

const ScrollCamera = () => {
  const camera = useRef()
  const depth = useContext(DepthContext)
  const { scrollProgress } = useContext(ScrollContext)
  const { target, setTarget } = useContext(TargetContext)

  useFrame((state) => {
    if (target) {
      camera.current.position.lerp(target, 0.1)
    } else {
      camera.current.position.lerp(new THREE.Vector3(0,0,-scrollProgress * depth), 0.1)
    }
  })

  return (
    <group ref={camera} name="Camera" position={[0, 0, 0]} rotation={[0, 0, 0]} >
      <PerspectiveCamera makeDefault far={50} near={0.1} fov={50} rotation={[0, 0, 0]}>
        <Particles count={5000}/>
        <rectAreaLight
          width={10}
          height={10}
          intensity={1}
          position={[1, 4, 0]}
          rotation={[0, 0, 0]}
          // castShadow
        />
      </PerspectiveCamera>
    </group>
  )
}

export default ScrollCamera