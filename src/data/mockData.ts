import { Project, ContactMessage, UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: "Dev Architect",
  username: "dev_architect",
  role: "Full Stack Engineer",
  avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
  bio: "Architecting distributed cloud systems, modern reactive frontends, and AI developer tools. Open to collaborative open-source engineering.",
  projectsCount: 42,
  contributionsCount: 1200,
  followingCount: 890,
  skills: ["Rust", "React", "TypeScript", "Docker", "Kubernetes", "Python", "Go"],
  website: "https://devcanvas.io/@dev_architect",
  github: "https://github.com/dev_architect"
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: "ecotracker-ai",
    title: "EcoTracker AI",
    version: "v1.2.0",
    author: {
      name: "Elena Rodriguez",
      username: "elena_rodriguez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      role: "Climate Tech AI Lead",
      isOnline: true
    },
    description: "Herramienta impulsada por IA para monitorizar y optimizar el consumo energético en servidores cloud. Utiliza modelos predictivos ligeros.",
    longDescription: `EcoTracker AI is an open-source machine learning pipeline designed to analyze satellite imagery and predict deforestation risks in real-time. By leveraging computer vision and historical climate data, it provides actionable insights for conservation efforts globally.

The system is built for high throughput and low latency, capable of processing massive GeoTIFF datasets while maintaining a lightweight footprint for edge deployment in remote research stations.`,
    tags: ["Python", "TensorFlow", "Docker", "AWS SageMaker", "Git", "GeoPandas"],
    category: "Machine Learning",
    stars: 1400,
    forks: 342,
    commits: 89,
    contributors: 12,
    views: 4890,
    githubUrl: "https://github.com/devcanvas/ecotracker-ai",
    isAvailableForCollab: true,
    isPublic: true,
    updatedAt: "2 days ago",
    readme: {
      lastUpdated: "2 days ago",
      content: `# EcoTracker AI

A scalable pipeline for satellite image analysis focusing on environmental conservation.

## Installation

\`\`\`bash
$ git clone https://github.com/devcanvas/ecotracker-ai.git
$ cd ecotracker-ai
$ pip install -r requirements.txt
$ python setup.py install
\`\`\`

## Quick Start

\`\`\`python
import ecotracker as et

# Load sample satellite data dataset
dataset = et.load_dataset('amazon_basin_2024')

# Run inference model
model = et.models.DeforestationPredictor()
results = model.predict(dataset)

# Generate heat map
results.plot_risk_map(output='risk_analysis.png')
print("Analysis complete: Risk index computed successfully.")
\`\`\`

## Contributing

We welcome contributions! Please review our CONTRIBUTING.md guidelines before submitting a pull request. Ensure all tests pass by running pytest locally.`
    }
  },
  {
    id: "neondb-wrapper",
    title: "NeonDB Wrapper",
    version: "v0.9.4",
    author: {
      name: "Marcus Vance",
      username: "marcus_dev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      role: "Backend Architect",
      isOnline: true
    },
    description: "Un wrapper hiper-optimizado en Go para interactuar con Neon Serverless Postgres. Reduce la latencia de cold starts en entornos serverless.",
    longDescription: "A high-performance Go driver and connection pool wrapper engineered specifically for serverless PostgreSQL runtimes with sub-millisecond connection resumption.",
    tags: ["Go", "PostgreSQL", "Serverless"],
    category: "Serverless",
    stars: 856,
    forks: 112,
    commits: 45,
    contributors: 8,
    views: 2340,
    githubUrl: "https://github.com/devcanvas/neondb-wrapper",
    isAvailableForCollab: true,
    isPublic: true,
    updatedAt: "1 day ago"
  },
  {
    id: "react-glitch-ui",
    title: "React-Glitch-UI",
    version: "v2.1.0",
    author: {
      name: "Aria Chen",
      username: "aria_codes",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      role: "Design Technologist",
      isOnline: false
    },
    description: "Colección de componentes React enfocados en estéticas cyberpunk y efectos de glitch visual para interfaces de usuario modernas.",
    longDescription: "A modular, accessible UI toolkit bringing futuristic cyberpunk visual effects, CRT filters, chromatic aberration shaders, and glitch text animations to React.",
    tags: ["React", "TypeScript", "Tailwind"],
    category: "UI",
    stars: 2400,
    forks: 450,
    commits: 112,
    contributors: 19,
    views: 9400,
    githubUrl: "https://github.com/devcanvas/react-glitch-ui",
    isAvailableForCollab: false,
    isPublic: true,
    updatedAt: "4 days ago"
  },
  {
    id: "neural-core",
    title: "neural-core",
    version: "v3.0.1",
    author: {
      name: "Dr. Kian Thorne",
      username: "kian_t",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      role: "Deep Learning Researcher",
      isOnline: true
    },
    description: "A high-performance deep learning framework built entirely in Python with native CUDA kernel acceleration.",
    longDescription: "Neural-Core offers dynamic graph execution, automatic differentiation, and memory-efficient distributed tensor computation for large multimodal architectures.",
    tags: ["Python", "Machine Learning", "CUDA"],
    category: "Machine Learning",
    stars: 12400,
    forks: 3200,
    commits: 412,
    contributors: 54,
    views: 34000,
    githubUrl: "https://github.com/devcanvas/neural-core",
    isAvailableForCollab: true,
    isPublic: true,
    updatedAt: "Updated 2 hrs ago"
  },
  {
    id: "django-forge",
    title: "django-forge",
    version: "v1.8.0",
    author: {
      name: "Lucia Morales",
      username: "lucia_m",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      role: "Backend Engineer",
      isOnline: true
    },
    description: "Rapid API development toolkit for Django. Generates production-ready OpenAPI schema compliant microservices in seconds.",
    longDescription: "Django-Forge automates boilerplate CRUD endpoints, JWT authentication policies, rate limiting, and automated test suites for Django developers.",
    tags: ["Python", "Web", "Django"],
    category: "Web",
    stars: 8900,
    forks: 1500,
    commits: 156,
    contributors: 22,
    views: 18200,
    githubUrl: "https://github.com/devcanvas/django-forge",
    isAvailableForCollab: false,
    isPublic: true,
    updatedAt: "Updated 3 days ago"
  },
  {
    id: "pyscript-desktop",
    title: "pyscript-desktop",
    version: "v0.8.2",
    author: {
      name: "Taro Tanaka",
      username: "taro_t",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      role: "Desktop App Specialist",
      isOnline: true
    },
    description: "Run Python applications as native desktop executables using a lightweight WebAssembly and WebView runtime.",
    longDescription: "Pyscript Desktop enables distributing zero-install Python software to Windows, macOS, and Linux without packaging a bulky Python interpreter.",
    tags: ["Python", "Desktop", "WebAssembly"],
    category: "Desktop",
    stars: 5100,
    forks: 842,
    commits: 78,
    contributors: 15,
    views: 11200,
    githubUrl: "https://github.com/devcanvas/pyscript-desktop",
    isAvailableForCollab: true,
    isPublic: true,
    updatedAt: "Updated 5 hrs ago"
  },
  // User's own projects (Matching Screen 4 & Screen 8)
  {
    id: "quantum-api-gateway",
    title: "Quantum API Gateway",
    version: "v2.0.0",
    author: {
      name: "Dev Architect",
      username: "dev_architect",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      role: "Full Stack Engineer",
      isOnline: true
    },
    description: "A high-performance, Rust-based API gateway designed for microservices with built-in token rate limiting and telemetry.",
    longDescription: "Engineered in asynchronous Rust utilizing Tokio and Tower. Handles millions of concurrent RPC queries with sub-microsecond overhead.",
    tags: ["Rust", "Docker", "Kubernetes"],
    category: "Backend",
    stars: 1400,
    forks: 230,
    commits: 96,
    contributors: 6,
    views: 4500,
    githubUrl: "https://github.com/dev_architect/quantum-api-gateway",
    isAvailableForCollab: true,
    isPublic: true,
    updatedAt: "Updated 2 days ago"
  },
  {
    id: "nexus-ui",
    title: "NexusUI",
    version: "v1.4.0",
    author: {
      name: "Dev Architect",
      username: "dev_architect",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      role: "Full Stack Engineer",
      isOnline: true
    },
    description: "A futuristic, dark-mode first component library for React, utilizing WebGL for interactive shader backgrounds and fluid micro-interactions.",
    longDescription: "A curated collection of accessible, keyboard-navigable components crafted with Tailwind CSS and Three.js shader canvases.",
    tags: ["React", "TypeScript", "Tailwind"],
    category: "UI",
    stars: 890,
    forks: 120,
    commits: 64,
    contributors: 4,
    views: 3100,
    githubUrl: "https://github.com/dev_architect/nexus-ui",
    isAvailableForCollab: true,
    isPublic: true,
    updatedAt: "Updated 4 days ago"
  },
  {
    id: "neuralnet-visualizer",
    title: "NeuralNet-Visualizer",
    version: "v0.9.0",
    author: {
      name: "Dev Architect",
      username: "dev_architect",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      role: "Full Stack Engineer",
      isOnline: true
    },
    description: "Interactive 3D visualization tool for deep learning models, allowing real-time inspection of node activations and weight tensors.",
    longDescription: "Enables researchers to step through backpropagation passes in real-time with WebGL rendering of deep neural layers.",
    tags: ["Python", "Three.js"],
    category: "Machine Learning",
    stars: 320,
    forks: 45,
    commits: 38,
    contributors: 2,
    views: 920,
    githubUrl: "https://github.com/dev_architect/neuralnet-visualizer",
    isAvailableForCollab: false,
    isPrivate: true,
    isPublic: false,
    updatedAt: "Updated 1 week ago"
  },
  {
    id: "nexus-data-pipeline",
    title: "Nexus Data Pipeline",
    version: "v1.1.2",
    author: {
      name: "Dev Architect",
      username: "dev_architect",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      role: "Full Stack Engineer",
      isOnline: true
    },
    description: "A high-throughput data processing pipeline built with Rust and Apache Kafka.",
    longDescription: "Scalable streaming engine capable of ingesting 500k event messages per second with zero message loss and guaranteed ordered delivery.",
    tags: ["Rust", "Kafka"],
    category: "Backend",
    stars: 342,
    forks: 67,
    views: 1200,
    githubUrl: "https://github.com/dev_architect/nexus-data-pipeline",
    isAvailableForCollab: true,
    isPublic: true,
    updatedAt: "Updated 3 days ago"
  },
  {
    id: "auth-microservice",
    title: "Authentication Microservice",
    version: "v0.4.0",
    author: {
      name: "Dev Architect",
      username: "dev_architect",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      role: "Full Stack Engineer",
      isOnline: true
    },
    description: "OAuth2 provider implementation using Go and Redis. Still working on the refresh token rotation mechanism.",
    longDescription: "Lightweight, highly secure auth server implementing PKCE, JWT access tokens, Redis blacklist sessions, and passkey support.",
    tags: ["Go", "Redis"],
    category: "Backend",
    stars: 12,
    forks: 3,
    views: 180,
    githubUrl: "https://github.com/dev_architect/auth-microservice",
    isDraft: true,
    isPublic: false,
    updatedAt: "Last edited 2 days ago"
  },
  {
    id: "react-cyber-ui",
    title: "React-Cyber-UI",
    version: "v2.0.4",
    author: {
      name: "Dev Architect",
      username: "dev_architect",
      avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
      role: "Full Stack Engineer",
      isOnline: true
    },
    description: "A collection of futuristic UI components for React applications with built-in WebGL shaders and audio cues.",
    longDescription: "Pre-built Sci-Fi dialogs, HUD gauges, telemetry cards, and audio synthesizer feedback for next-generation developer tooling.",
    tags: ["React", "WebGL"],
    category: "UI",
    stars: 1200,
    forks: 180,
    views: 8500,
    githubUrl: "https://github.com/dev_architect/react-cyber-ui",
    isAvailableForCollab: true,
    isPublic: true,
    updatedAt: "Updated 1 week ago"
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    projectId: "distributed-kv-rust",
    projectTitle: "Distributed Key-Value Store in Rust",
    creatorUsername: "systems_guru",
    creatorName: "Alexei Rostova",
    creatorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
    status: "replied",
    timeAgo: "2 days ago",
    tags: ["Rust", "Tokio", "Raft"],
    lastMessage: "Hey! Loved your idea on gossip protocol optimization. Let's merge your PR branch into dev!",
    chatHistory: [
      {
        id: "c1",
        sender: "user",
        text: "Hi Alexei, I saw your Raft consensus implementation in Distributed Key-Value Store. I'd love to contribute an optimized gossip-based failure detector module.",
        timestamp: "3 days ago"
      },
      {
        id: "c2",
        sender: "creator",
        text: "Hey! Loved your idea on gossip protocol optimization. Let's merge your PR branch into dev!",
        timestamp: "2 days ago"
      }
    ]
  },
  {
    id: "msg-2",
    projectId: "web3-identity-provider",
    projectTitle: "Web3 Identity Provider Module",
    creatorUsername: "crypto_dev",
    creatorName: "Siddharth Menon",
    creatorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80",
    status: "sent",
    timeAgo: "5 days ago",
    tags: ["Solidity", "TypeScript"],
    lastMessage: "Message delivered: Inquired about collaborating on ERC-4337 account abstraction bundlers.",
    chatHistory: [
      {
        id: "c3",
        sender: "user",
        text: "Hello Siddharth! Are you planning to add support for ERC-4337 smart accounts and paymasters? I have a draft implementation ready.",
        timestamp: "5 days ago"
      }
    ]
  },
  {
    id: "msg-3",
    projectId: "ai-code-review",
    projectTitle: "AI-Powered Code Review Assistant",
    creatorUsername: "ml_engineer",
    creatorName: "Sofia Lindberg",
    creatorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    status: "collaborating",
    timeAgo: "Started 2 weeks ago",
    tags: ["Python", "PyTorch", "React"],
    lastMessage: "Workspace active: Working on AST parsing and AST differential tokens.",
    chatHistory: [
      {
        id: "c4",
        sender: "user",
        text: "Hi Sofia, I'm interested in helping build the AST tokenizer for Python codebases.",
        timestamp: "2 weeks ago"
      },
      {
        id: "c5",
        sender: "creator",
        text: "Awesome! Welcome to the repository team. I've sent you collaborator access and shared the sprint board.",
        timestamp: "2 weeks ago"
      }
    ]
  }
];
