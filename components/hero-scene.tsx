'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const HeroSceneCanvas = dynamic(() => import('@/components/hero-scene-canvas').then((module) => module.HeroSceneCanvas), { ssr: false, loading: () => <div className="hero-product" aria-label="Loading ORVYN product visual" /> });

export function HeroScene({ tone = 'ink' }: { tone?: string }) {
  const [paused, setPaused] = useState(false); const [inspecting, setInspecting] = useState(false); const [failed, setFailed] = useState(false);
  useEffect(() => { const onError = () => setFailed(true); window.addEventListener('error', onError); return () => window.removeEventListener('error', onError); }, []);
  return <div className="hero-stage" aria-label="Interactive ORVYN product stage"><div className="hero-stage-frame" />{failed ? <div className="hero-product" role="img" aria-label="Static ORVYN product visual" /> : <HeroSceneCanvas tone={tone} paused={paused} inspecting={inspecting} />}<div className="hero-controls"><button onClick={() => setInspecting((value) => !value)} aria-pressed={inspecting}>{inspecting ? 'Exit inspect' : 'Inspect'}</button><button onClick={() => setPaused((value) => !value)} aria-pressed={paused}>{paused ? 'Resume' : 'Pause'}</button></div></div>;
}
