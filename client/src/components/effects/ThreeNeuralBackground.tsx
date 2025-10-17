import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Network Node with connections
function NetworkNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const nodesRef = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Generate network nodes in a grid-like structure
  const { nodePositions, connections } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const gridSize = 8;
    const spacing = 3;
    
    // Create a grid of nodes
    for (let x = -gridSize; x <= gridSize; x += 2) {
      for (let y = -gridSize; y <= gridSize; y += 2) {
        const z = Math.sin(x * 0.3) * Math.cos(y * 0.3) * 2;
        nodes.push(new THREE.Vector3(x * spacing, y * spacing, z));
      }
    }
    
    // Create connections between nearby nodes
    const connectionIndices: number[] = [];
    const maxDistance = spacing * 2.5;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].distanceTo(nodes[j]);
        if (distance < maxDistance) {
          connectionIndices.push(i, j);
        }
      }
    }
    
    return {
      nodePositions: new Float32Array(nodes.flatMap(v => [v.x, v.y, v.z])),
      connections: connectionIndices
    };
  }, []);

  // Create line geometry for connections
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(connections.length * 3);
    
    for (let i = 0; i < connections.length; i++) {
      const nodeIndex = connections[i];
      positions[i * 3] = nodePositions[nodeIndex * 3];
      positions[i * 3 + 1] = nodePositions[nodeIndex * 3 + 1];
      positions[i * 3 + 2] = nodePositions[nodeIndex * 3 + 2];
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [nodePositions, connections]);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      
      // Slow rotation
      groupRef.current.rotation.z = Math.sin(time * 0.1) * 0.05;
      
      // Parallax effect based on mouse position
      groupRef.current.rotation.x = mousePosition.current.y * 0.1;
      groupRef.current.rotation.y = mousePosition.current.x * 0.1;
      
      // Wave effect on nodes
      if (nodesRef.current) {
        const positions = nodesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          const x = nodePositions[i];
          const y = nodePositions[i + 1];
          positions[i + 2] = nodePositions[i + 2] + 
            Math.sin(time + x * 0.3) * Math.cos(time + y * 0.3) * 0.5;
        }
        nodesRef.current.geometry.attributes.position.needsUpdate = true;
      }
      
      // Update line positions to match nodes
      if (linesRef.current && nodesRef.current) {
        const nodePos = nodesRef.current.geometry.attributes.position.array as Float32Array;
        const linePos = linesRef.current.geometry.attributes.position.array as Float32Array;
        
        for (let i = 0; i < connections.length; i++) {
          const nodeIndex = connections[i];
          linePos[i * 3] = nodePos[nodeIndex * 3];
          linePos[i * 3 + 1] = nodePos[nodeIndex * 3 + 1];
          linePos[i * 3 + 2] = nodePos[nodeIndex * 3 + 2];
        }
        linesRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial 
          color="#00FFFF" 
          transparent 
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* Network Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={nodePositions.length / 3}
            array={nodePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#4FFFB0"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// Flowing particles along network
function FlowingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleCount = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < particleCount; i++) {
        // Flow along paths
        positions[i * 3] += Math.sin(time + i) * 0.02;
        positions[i * 3 + 1] += Math.cos(time * 0.7 + i) * 0.02;
        positions[i * 3 + 2] = Math.sin(time + positions[i * 3] * 0.1) * 3;
        
        // Reset particles that go too far
        if (Math.abs(positions[i * 3]) > 20) positions[i * 3] *= -0.5;
        if (Math.abs(positions[i * 3 + 1]) > 20) positions[i * 3 + 1] *= -0.5;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#35E2E2"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Ripple effect that triggers periodically
function RippleEffect() {
  const rippleRef = useRef<THREE.Mesh<THREE.RingGeometry, THREE.MeshBasicMaterial>>(null);
  
  useFrame((state) => {
    if (rippleRef.current) {
      const time = state.clock.elapsedTime;
      const ripplePhase = (time % 4) / 4; // Ripple every 4 seconds
      
      rippleRef.current.scale.setScalar(1 + ripplePhase * 15);
      const material = rippleRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = (1 - ripplePhase) * 0.3;
    }
  });

  return (
    <mesh ref={rippleRef} position={[0, 0, -5]}>
      <ringGeometry args={[1, 1.2, 32]} />
      <meshBasicMaterial
        color="#00FFFF"
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Glowing orbs for depth
function GlowingOrbs() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 12;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              Math.sin(angle * 2) * 5 - 8
            ]}
          >
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#00FFFF" : i % 3 === 1 ? "#4FFFB0" : "#35E2E2"}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Camera controller
function CameraController() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    camera.position.x = Math.sin(time * 0.05) * 1;
    camera.position.y = Math.cos(time * 0.03) * 0.5;
  });
  
  return null;
}

// Main component
const ThreeNeuralBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 0, 10]} intensity={0.5} color="#00FFFF" />
        
        <NetworkNodes />
        <FlowingParticles />
        <RippleEffect />
        <GlowingOrbs />
        <CameraController />
      </Canvas>
    </div>
  );
};

export default ThreeNeuralBackground;
