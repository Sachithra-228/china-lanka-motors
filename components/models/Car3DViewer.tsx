'use client';

import { Suspense, useLayoutEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

function ClearTransparent() {
  const { scene, gl } = useThree();
  useLayoutEffect(() => {
    scene.background = null;
    gl.setClearColor(0x000000, 0);
  }, [scene, gl]);
  return null;
}

function ProceduralCar() {
  return (
    <group>
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.6, 1]} />
        <meshStandardMaterial color="#4A70A9" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.7, 0.1]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.5, 0.9]} />
        <meshStandardMaterial color="#4A70A9" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[-0.9, 0.15, 0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.9, 0.15, 0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.9, 0.15, -0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.9, 0.15, -0.6]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function ImportedCarModel({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <primitive
      object={clonedScene}
      position={[0, -0.8, 0]}
      scale={1.25}
    />
  );
}

function Scene({ modelUrl }: { modelUrl?: string }) {
  return (
    <>
      <ClearTransparent />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} />
      <Suspense fallback={null}>
        {modelUrl ? <ImportedCarModel modelUrl={modelUrl} /> : <ProceduralCar />}
      </Suspense>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={2.2}
        maxDistance={8}
        autoRotate={true}
        autoRotateSpeed={0.75}
      />
      <Environment preset="city" />
    </>
  );
}

export function Car3DViewer({ modelUrl, className = '' }: { modelUrl?: string; className?: string }) {
  return (
    <div className={`h-64 w-full overflow-hidden rounded-2xl sm:h-72 md:h-80 ${className}`}>
      <Canvas
        camera={{ position: [3, 1.5, 3], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        <Scene modelUrl={modelUrl} />
      </Canvas>
    </div>
  );
}
