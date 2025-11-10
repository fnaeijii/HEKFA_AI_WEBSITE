// src/pages/Projects.tsx - FIXED VERSION

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Lottie from 'react-lottie-player';
import api from '@/lib/axiosConfig';
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  X, ExternalLink, Code, Bot, BrainCircuit, Database, 
  Wind, Sparkles, Zap, Globe, Server, Palette, 
  Lock, Cloud, Cpu, Layers, Box, FileCode,
  Info, MousePointer, MousePointerClick // تغییر Click به MousePointerClick
} from 'lucide-react';

import animationData from '@/assets/lottie/neural-network-bg.json';

interface Project {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  status: string;
  technologies: string[];
  metrics?: { [key: string]: string };
}

// Enhanced technology icons mapping
const technologyIcons: { [key: string]: any } = {
  'React': Code,
  'TypeScript': FileCode,
  'JavaScript': Zap,
  'Node.js': Server,
  'MongoDB': Database,
  'Tailwind CSS': Palette,
  'CSS': Wind,
  'Python': Code,
  'TensorFlow': BrainCircuit,
  'Computer Vision': Bot,
  'AI/ML': Sparkles,
  'Next.js': Globe,
  'Express': Server,
  'PostgreSQL': Database,
  'Docker': Box,
  'AWS': Cloud,
  'Security': Lock,
  'GraphQL': Layers,
  'Microservices': Cpu,
  'Default': BrainCircuit,
};

// Enhanced color schemes for different categories
const categoryColors: { [key: string]: string } = {
  'Web Development': 'from-blue-500 to-cyan-500',
  'Machine Learning': 'from-purple-500 to-pink-500',
  'Mobile Development': 'from-green-500 to-emerald-500',
  'Backend': 'from-orange-500 to-red-500',
  'Full Stack': 'from-indigo-500 to-purple-500',
  'Default': 'from-gray-500 to-slate-500'
};

// Status colors
const statusColors: { [key: string]: string } = {
  'Completed': 'bg-green-500/20 text-green-500 border-green-500/30',
  'In Progress': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  'Planned': 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  'Default': 'bg-gray-500/20 text-gray-500 border-gray-500/30'
};

type Node = {
  id: string;
  type: 'project' | 'technology' | 'center';
  label: string;
  x: number;
  y: number;
  radius: number;
  Icon?: any;
  category?: string;
  status?: string;
  description?: string;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  strength?: number;
};

// Custom hook for window dimensions
// Custom hook for window dimensions
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({ 
    width: typeof window !== 'undefined' ? window.innerWidth : 0, 
    height: typeof window !== 'undefined' ? window.innerHeight : 0 
  });

  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    // Set immediately
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

const ProjectsInteractive = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTechnology, setActiveTechnology] = useState<string | null>(null);
  const [showLegend, setShowLegend] = useState(true);
  
  const { width, height } = useWindowDimensions();
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const projectsResponse = await api.get('/projects');
        console.log('Projects received:', projectsResponse.data); // برای دیباگ
        setProjects(projectsResponse.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch projects. Please make sure the server is running.');
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { nodes, edges } = useMemo(() => {
  if (!projects.length && width === 0) return { nodes: [], edges: [] };
  
  const projectsToShow = projects.length > 0 ? projects : [
    {
      _id: 'demo1',
      title: 'Sample Project 1',
      slug: 'sample-1',
      summary: 'This is a demo project',
      description: 'Demo description',
      category: 'Web Development',
      status: 'Completed',
      technologies: ['React', 'TypeScript', 'Node.js']
    },
    {
      _id: 'demo2',
      title: 'Sample Project 2',
      slug: 'sample-2',
      summary: 'Another demo project',
      description: 'Demo description',
      category: 'Machine Learning',
      status: 'In Progress',
      technologies: ['Python', 'TensorFlow', 'MongoDB']
    }
  ];

  const graphNodes: Node[] = [];
  const graphEdges: Edge[] = [];
  const techMap = new Map<string, number>();

  const safeWidth = width || 1000;
  const safeHeight = height || 800;
  // تغییر مهم: استفاده از مقادیر کوچکتر و امن‌تر
  const centerX = width / 2;
  const centerY = height / 2;
  const center = { x: centerX, y: centerY };

  console.log('Creating graph with center:', { centerX, centerY, safeWidth, safeHeight });

  // Add center node
  graphNodes.push({
    id: 'center',
    type: 'center',
    label: 'Portfolio',
    x: centerX,
    y: centerY,
    radius: 40,
    Icon: Sparkles,
  });

  // تغییر: محاسبه radius امن‌تر با padding
  const minDimension = Math.min(safeWidth, safeHeight);
  const padding = 150; // فضای امن از لبه‌ها
  const safeRadius = (minDimension - padding) / 2;
  
  const projectOrbitRadius = safeRadius * 0.6;  // 60% از فضای امن
  const techOrbitRadius = safeRadius * 0.9;     // 90% از فضای امن

  // Add project nodes in a circle
  projectsToShow.forEach((project, i) => {
    const angle = (i / projectsToShow.length) * 2 * Math.PI - Math.PI / 2;
    graphNodes.push({
      id: project._id,
      type: 'project',
      label: project.title,
      x: centerX + projectOrbitRadius * Math.cos(angle),
      y: centerY + projectOrbitRadius * Math.sin(angle),
      radius: 45,
      category: project.category,
      status: project.status,
      description: project.summary,
    });

    project.technologies.forEach(tech => {
      techMap.set(tech, (techMap.get(tech) || 0) + 1);
    });
  });

  // Add technology nodes in outer circle
  const technologies = Array.from(techMap.keys());
  technologies.forEach((tech, i) => {
    const angle = (i / technologies.length) * 2 * Math.PI - Math.PI / 2;
    const usageCount = techMap.get(tech) || 1;
    const radiusBonus = Math.min(usageCount * 3, 15);
    
    graphNodes.push({
      id: tech,
      type: 'technology',
      label: tech,
      x: centerX + techOrbitRadius * Math.cos(angle),
      y: centerY + techOrbitRadius * Math.sin(angle),
      radius: 20 + radiusBonus,
      Icon: technologyIcons[tech] || technologyIcons.Default,
    });
  });

  // Create edges
  projectsToShow.forEach(project => {
    graphEdges.push({
      id: `center-${project._id}`,
      source: 'center',
      target: project._id,
      strength: 0.3,
    });

    project.technologies.forEach(tech => {
      graphEdges.push({
        id: `${project._id}-${tech}`,
        source: project._id,
        target: tech,
        strength: 0.7,
      });
    });
  });

  return { nodes: graphNodes, edges: graphEdges };
}, [projects, width, height]);

// Debug log
useEffect(() => {
  console.log('Viewport dimensions:', { width, height });
  console.log('Nodes count:', nodes.length);
  if (nodes.length > 0) {
    console.log('Sample node positions:', nodes.slice(0, 5).map(n => ({
      id: n.id,
      type: n.type,
      x: n.x,
      y: n.y
    })));
  }
}, [width, height, nodes]);
  const getNodeById = useCallback((id: string) => nodes.find(n => n.id === id), [nodes]);

  const selectedProject = useMemo(() => {
    return projects.find(p => p._id === selectedProjectId);
  }, [selectedProjectId, projects]);

  // Calculate connected nodes for highlighting
  const connectedNodes = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    
    const connected = new Set<string>();
    edges.forEach(edge => {
      if (edge.source === hoveredNodeId) connected.add(edge.target);
      if (edge.target === hoveredNodeId) connected.add(edge.source);
    });
    connected.add(hoveredNodeId);
    return connected;
  }, [hoveredNodeId, edges]);

  // Filter nodes based on active technology
  const filteredNodes = useMemo(() => {
    if (!activeTechnology) return new Set<string>();
    
    const filtered = new Set<string>();
    filtered.add(activeTechnology);
    filtered.add('center');
    
    edges.forEach(edge => {
      if (edge.target === activeTechnology) {
        filtered.add(edge.source);
      }
    });
    
    return filtered;
  }, [activeTechnology, edges]);

  // Handle ESC key to clear filters
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveTechnology(null);
        setSelectedProjectId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

if (loading) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Skeleton className="w-48 h-48 rounded-full mb-4" />
      <Skeleton className="w-64 h-8" />
    </div>
  );
}
if (width === 0 || height === 0) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <p className="text-muted-foreground">Initializing visualization...</p>
    </div>
  );
}
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="text-red-500 text-center">
          <BrainCircuit className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <Lottie 
          loop 
          animationData={animationData} 
          play 
          style={{ width: '100%', height: '100%', opacity: 0.1 }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
      </div>
      
      {/* Header */}
      <header className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-bold md:text-6xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Project Universe
          </h1>
          <p className="mt-3 text-lg text-muted-foreground flex items-center justify-center gap-2">
            <MousePointer className="w-4 h-4" />
            Hover to explore connections
            <span className="mx-2">•</span>
            <MousePointerClick className="w-4 h-4" />
            Click to interact
          </p>
        </motion.div>
      </header>

      {/* Legend */}
      <AnimatePresence>
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-32 left-8 z-20 p-4 bg-card/80 backdrop-blur-md rounded-lg border border-border/50 shadow-xl"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center gap-2">
                <Info className="w-4 h-4" />
                Legend
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setShowLegend(false)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </div>
                <span>Center Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-primary/60 bg-primary/10"></div>
                <span>Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/60 bg-muted/10"></div>
                <span>Technologies</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Show Legend Button */}
      {!showLegend && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setShowLegend(true)}
          className="absolute top-32 left-8 z-20 p-2 bg-card/80 backdrop-blur-md rounded-lg border border-border/50 hover:bg-card/90 transition-colors"
        >
          <Info className="w-4 h-4" />
        </motion.button>
      )}

      {/* Active Filters */}
      <AnimatePresence>
        {activeTechnology && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-32 right-8 z-20"
          >
            <Badge 
              variant="secondary" 
              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary/80 transition-colors"
              onClick={() => setActiveTechnology(null)}
            >
              Filtering: {activeTechnology}
              <X className="w-3 h-3 ml-2" />
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Graph Visualization */}
      <div className="relative z-10 w-full h-screen">
        <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ maxHeight: '100vh', maxWidth: '100vw' }}
        >          {/* Define gradients */}
          <defs>
            <linearGradient id="gradient-primary">
              <stop offset="0%" stopColor="rgb(var(--primary))" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(var(--primary))" stopOpacity="0.6" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Render Edges */}
          <g className="edges-layer">
            {edges.map(edge => {
              const source = getNodeById(edge.source);
              const target = getNodeById(edge.target);
              if (!source || !target) return null;

              const isHighlighted = connectedNodes.has(source.id) && connectedNodes.has(target.id);
              const isFiltered = activeTechnology && (filteredNodes.has(source.id) && filteredNodes.has(target.id));
              const shouldShow = !activeTechnology || isFiltered;
              const opacity = !shouldShow ? 0 : isHighlighted ? 0.8 : 0.2;

              return (
                <motion.line
                  key={edge.id}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isHighlighted ? "rgb(var(--primary))" : "currentColor"}
                  className="stroke-primary/30"
                  strokeWidth={isHighlighted ? 2 : 1}
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ 
                    opacity: opacity,
                    pathLength: 1,
                  }}
                  transition={{ 
                    duration: 0.5,
                    opacity: { duration: 0.3 }
                  }}
                />
              );
            })}
          </g>

          {/* Render Nodes */}
          <g className="nodes-layer">
            {nodes.map(node => {
              const isHovered = hoveredNodeId === node.id;
              const isConnected = connectedNodes.has(node.id);
              const isFiltered = !activeTechnology || filteredNodes.has(node.id);
              const shouldHighlight = isHovered || (hoveredNodeId && isConnected);
              const opacity = !isFiltered ? 0.2 : shouldHighlight ? 1 : 0.8;
              
              const Icon = node.Icon;
              const isCenter = node.type === 'center';
              const isProject = node.type === 'project';
              const isTechnology = node.type === 'technology';

              return (
                <motion.g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={() => {
                    if (isProject) {
                      setSelectedProjectId(node.id);
                    } else if (isTechnology) {
                      setActiveTechnology(activeTechnology === node.id ? null : node.id);
                    }
                  }}
                  className="cursor-pointer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: opacity,
                    scale: isHovered ? 1.15 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: Math.random() * 0.3,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Node Circle */}
                  {isCenter ? (
                    // Center node with gradient
                    <>
                      <circle
                        r={node.radius}
                        className="fill-primary stroke-primary"
                        strokeWidth="2"
                        opacity={0.2}
                        filter="url(#glow)"
                      />
                      <circle
                        r={node.radius}
                        fill="url(#gradient-primary)"
                        strokeWidth="0"
                      />
                    </>
                  ) : isProject ? (
                    // Project node
                    <>
                      <circle
                        r={node.radius}
                        className={`fill-primary/10 stroke-primary ${shouldHighlight ? 'stroke-2' : 'stroke-1'}`}
                        strokeWidth={shouldHighlight ? 3 : 2}
                        strokeDasharray={node.status === 'In Progress' ? "5,5" : "0"}
                        filter={shouldHighlight ? "url(#glow)" : ""}
                      />
                      {shouldHighlight && (
                        <circle
                          r={node.radius - 5}
                          className="fill-primary/5"
                          strokeWidth="0"
                        />
                      )}
                    </>
                  ) : (
                    // Technology node
                    <>
                      <circle
                        r={node.radius}
                        className={`
                          ${activeTechnology === node.id 
                            ? 'fill-secondary/20 stroke-secondary' 
                            : 'fill-muted/10 stroke-muted-foreground/50'
                          }
                          ${shouldHighlight ? 'stroke-2' : 'stroke-1'}
                        `}
                        strokeWidth={shouldHighlight ? 2 : 1}
                        filter={shouldHighlight ? "url(#glow)" : ""}
                      />
                    </>
                  )}

                  {/* Node Icon */}
                  {Icon && (
                    <Icon 
                      className={`
                        ${isCenter ? 'text-primary-foreground' : 
                          isProject ? 'text-primary' : 
                          'text-muted-foreground'}
                        ${shouldHighlight ? 'opacity-100' : 'opacity-70'}
                      `}
                      x={-node.radius/3}
                      y={-node.radius/3}
                      width={node.radius * 2/3}
                      height={node.radius * 2/3}
                    />
                  )}

                  {/* Node Label */}
                  <AnimatePresence>
                    {(shouldHighlight || isCenter) && (
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <rect
                          x={-node.label.length * 4}
                          y={node.radius + 5}
                          width={node.label.length * 8}
                          height={20}
                          rx={4}
                          className="fill-background/80"
                        />
                        <text
                          className="text-xs font-medium fill-foreground select-none"
                          textAnchor="middle"
                          y={node.radius + 18}
                        >
                          {node.label}
                        </text>
                      </motion.g>
                    )}
                  </AnimatePresence>
                </motion.g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
            onClick={() => setSelectedProjectId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <Card className="border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl">
                <CardHeader className="relative pb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setSelectedProjectId(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <div className="space-y-3">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {selectedProject.title}
                    </CardTitle>
                    
                    <div className="flex items-center gap-3">
                      <Badge 
                        variant="outline" 
                        className={`${statusColors[selectedProject.status] || statusColors.Default} border`}
                      >
                        {selectedProject.status}
                      </Badge>
                      <Badge variant="secondary" className="bg-primary/10">
                        {selectedProject.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Overview</h4>
                    <p className="text-base leading-relaxed">
                      {selectedProject.summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map(tech => {
                        const TechIcon = technologyIcons[tech] || technologyIcons.Default;
                        return (
                          <Badge 
                            key={tech} 
                            variant="secondary"
                            className="px-3 py-1.5 bg-secondary/50 hover:bg-secondary/70 transition-colors cursor-default"
                          >
                            <TechIcon className="w-3 h-3 mr-1.5" />
                            {tech}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90"
                    >
                      View Full Case Study
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-primary/20 hover:bg-primary/10"
                    >
                      View Source Code
                      <Code className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions Tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <Card className="px-4 py-2 bg-card/80 backdrop-blur-md border-border/50">
  <div className="text-sm text-muted-foreground flex items-center gap-4">
    <span className="flex items-center gap-1">
      {/* بقیه همون */}
    </span>
  </div>
</Card>
      </motion.div>
    </div>
  );
};

export default ProjectsInteractive;