'use client'

import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Avatar from './Avatar'

export default function AvatarWrapper() {
  return (
    <div className="w-full h-full" style={{ touchAction: 'none' }}>
      <Canvas
        camera={{ position: [0, 0.8, 2.5], fov: 45 }}
        gl={{
          alpha: true,
          antialias: true,
          preserveDrawingBuffer: true
        }}
        style={{ background: 'transparent', pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.6} color="#a855f7" />
        <pointLight position={[5, -5, 5]} intensity={0.6} color="#3b82f6" />
        <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.3} penumbra={1} color="#ffffff" />


        <React.Suspense fallback={null}>
          <Avatar position={[0, -0.6, 0]} scale={0.8} />
        </React.Suspense>


        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.6}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
