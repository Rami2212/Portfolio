'use client'

import React, { useEffect, useRef } from 'react'
import { useGraph, useFrame } from '@react-three/fiber'
import { useAnimations, useGLTF, useFBX } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export default function Avatar(props) {
  const group = useRef()


  const { scene } = useGLTF('models/avatar.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)


  const typingFBX = useFBX("animations/Typing.fbx")
  const wavingFBX = useFBX("animations/Waving.fbx")


  typingFBX.animations[0].name = "Typing"
  wavingFBX.animations[0].name = "Waving"


  const { actions } = useAnimations(
    [typingFBX.animations[0], wavingFBX.animations[0]],
    group
  )


  useEffect(() => {
    if (!actions?.Typing || !actions?.Waving) return


    const typing = actions["Typing"]
    const waving = actions["Waving"]


    typing.reset().fadeIn(0.2).play()


    let current = 0


    const loop = () => {
      if (current === 0) {
        typing.reset().fadeIn(0.2).play()
        waving.fadeOut(0.2)
        setTimeout(() => {
          current = 1
          loop()
        }, 5000)
      } else {
        waving.reset().fadeIn(0.2).play()
        typing.fadeOut(0.2)
        setTimeout(() => {
          current = 0
          loop()
        }, 5000)
      }
    }


    loop()


    return () => {
      typing.stop()
      waving.stop()
    }
  }, [actions])


  // useFrame((state) => {
  //     const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1);
  //     group.current.getObjectByName("Head").lookAt(target);
  // })


  return (
    <group {...props} ref={group} dispose={null} rotation={[0, -Math.PI / 9, 0]}>
      <primitive object={nodes.Hips} />


      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  )
}


useGLTF.preload('/models/avatar.glb')
