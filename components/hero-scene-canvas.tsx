'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, OrbitControls, RoundedBox } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function HeroObject({ tone, paused }: { tone: string; paused: boolean }) {
  const group = useRef<THREE.Group>(null); const color = tone === 'stone' ? '#b9ad9c' : tone === 'signal' ? '#d45c3b' : '#58646a';
  useFrame((state) => { if (!paused && group.current) { group.current.rotation.y = state.clock.elapsedTime * .9; group.current.rotation.x = 0.12 + Math.sin(state.clock.elapsedTime * .55) * .06; group.current.rotation.z = -0.16 + Math.sin(state.clock.elapsedTime * .7) * .035; } });
  return <group ref={group} rotation={[0.12, -0.18, -0.16]}><RoundedBox args={[2.5, .5, 1.35]} radius={.22} smoothness={6} position={[0, .05, 0]}><meshStandardMaterial color={color} metalness={.72} roughness={.26} /></RoundedBox><mesh position={[0, .37, 0]} rotation={[0, 0, -.1]}><boxGeometry args={[1.75, .06, .4]} /><meshStandardMaterial color="#2d3fd2" emissive="#2d3fd2" emissiveIntensity={.65} /></mesh><mesh position={[0, -.34, .05]}><cylinderGeometry args={[.58, .62, .12, 48]} /><meshStandardMaterial color="#171b20" metalness={.7} roughness={.34} /></mesh></group>;
}

export function HeroSceneCanvas({ tone = 'ink', paused = false, inspecting = false }: { tone?: string; paused?: boolean; inspecting?: boolean }) {
  return <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0.4, 5.8], fov: 34 }} gl={{ antialias: true, alpha: true }}><color attach="background" args={['#12161c']} /><ambientLight intensity={1.6} /><directionalLight position={[3, 4, 4]} intensity={4} color="#fff8ec" /><pointLight position={[-3, 0, 2]} intensity={3} color="#2d3fd2" /><HeroObject tone={tone} paused={paused} /><ContactShadows position={[0, -1.05, 0]} opacity={.55} scale={5} blur={2.4} far={3} /><OrbitControls enablePan={false} enableZoom={false} enableRotate={inspecting} autoRotate={false} touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.PAN }} /></Canvas>;
}
