import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations, PerspectiveCamera, Html, Plane } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import Particles from "./particles/Particles"

const color = new THREE.Color()

export default function Model({ scroll, ...props }) {
  const t = useRef(0)
  const group = useRef()
  const camera = useRef()
  const { nodes, materials, animations } = useGLTF("/model2.glb")
  const { actions, mixer } = useAnimations(animations, group)
  const [hovered, setHovered] = useState()
  const extras = { receiveShadow: true, castShadow: true }
  // useEffect(() => void (actions["CameraAction.005"].play().paused = true), [])
  // useEffect(() => {
  //   if (hovered) group.current.getObjectByName(hovered).material.color.set("blue")
  //   document.body.style.cursor = hovered ? "pointer" : "auto"
  // }, [hovered])

  useFrame((state) => {
    // actions["CameraAction.005"].time = THREE.MathUtils.lerp(actions["CameraAction.005"].time, actions["CameraAction.005"].getClip().duration * scroll.current, 0.05)
    camera.current.position.z = 2.04 - scroll.current * 100
    group.current.children[0].children.forEach((child, index) => {
      // child.material.color.lerp(color.set(hovered === child.name ? "tomato" : "#202020").convertSRGBToLinear(), hovered ? 0.1 : 0.05)
      const et = state.clock.elapsedTime
      // child.position.y = Math.sin((et + index * 2000) / 2) / 5
      child.rotation.x = Math.sin((et + index * 2000) / 3) / 10
      child.rotation.y = Math.cos((et + index * 2000) / 2) / 10
      child.rotation.z = Math.sin((et + index * 2000) / 3) / 10
    })
  })


  return (
    <group ref={group} {...props} dispose={null}>
      <group
        // name="test"
        // onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object.name))}
        // onPointerOut={(e) => (e.stopPropagation(), setHovered(null))}
        position={[0, 0, -30.35]}
        scale={[1, 1, 1]}>
        {/* <mesh name="Cube" {...extras}>
          <meshBasicMaterial color='pink'/>
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          <meshBasicMaterial attachArray="material" map={texture1} />
          <meshBasicMaterial attachArray="material" map={texture1} />
          <meshBasicMaterial attachArray="material" map={texture1} />
          <meshBasicMaterial attachArray="material" map={texture1} />
          <meshBasicMaterial attachArray="material" map={texture1} />
          <meshBasicMaterial attachArray="material" map={texture1} />
        </mesh> */}
        {/* <Plane position={[0, 0, -0.52]}>
          <meshBasicMaterial transparent attach="material" map={texture1} />
        </Plane> */}
        <Plane 
          name="test"
          position={[-0.5, 0, -0.5]}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object.name))}
          onPointerOut={(e) => {e.stopPropagation(); setHovered(null)}}
          >
          <meshBasicMaterial attach="material" color="pink" />
        </Plane>
        <Plane 
          name="test2"
          position={[0.5, 0, -0.5]}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object.name))}
          onPointerOut={(e) => {e.stopPropagation(); setHovered(null)}}
          >
          <meshBasicMaterial attach="material" color="pink" />
        </Plane>
        {/* <Plane position={[0.3, 0, -0.4]}>
          <meshBasicMaterial transparent attach="material" map={texture3} />
        </Plane> */}
        {/* <mesh>
        </mesh> */}
      </group>
      <group ref={camera} name="Camera" position={[0, 0, 0]} rotation={[1.62, 0, 0]} >
        <PerspectiveCamera makeDefault far={50} near={0.1} fov={28} rotation={[-Math.PI / 2, 0, 0]}>
        
          <Particles count={5000}/>
          {/* <directionalLight
            castShadow
            position={[10, 20, 15]}
            shadow-camera-right={8}
            shadow-camera-top={8}
            shadow-camera-left={-8}
            shadow-camera-bottom={-8}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            intensity={2}
            shadow-bias={-0.0001}
          /> */}
        </PerspectiveCamera>
      </group>
    </group>
  )
}

useGLTF.preload("/model2.glb")
