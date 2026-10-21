/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, QuizQuestion, Flashcard, Achievement } from '../types';

export const COURSES: Course[] = [
  {
    id: 'cs-distributed-systems',
    slug: 'advanced-distributed-systems',
    title: 'Advanced Distributed Systems & Consensus',
    category: 'Computer Science',
    description: 'Master Raft consensus, Byzantine fault tolerance, vector clocks, and distributed event-driven microservices at hyper-scale.',
    level: 'Mastermind',
    duration: '28 hours',
    rating: 4.96,
    studentsCount: 3840,
    progress: 68,
    instructor: {
      name: 'Dr. Elena Rostova',
      role: 'Principal Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
    thumbnailUrl: '/src/assets/images/course_distributed_systems_1792577191019.jpg',
    accentColor: 'indigo',
    modules: [
      {
        title: 'Module 1: The CAP Theorem & Network Partitions',
        duration: '4h 30m',
        lessons: ['Network Asynchrony & Partitions', 'PACELC Theorem Nuances', 'Linearizability vs Serializability'],
      },
      {
        title: 'Module 2: Raft & Multi-Paxos Deep Dive',
        duration: '6h 15m',
        lessons: ['Leader Election & Heartbeats', 'Log Replication & Safety Invariants', 'Dynamic Cluster Membership Changes'],
      },
      {
        title: 'Module 3: Distributed State & Vector Clocks',
        duration: '5h 45m',
        lessons: ['Lamport Timestamps', 'Vector Clock Causality Tracking', 'Conflict-Free Replicated Data Types (CRDTs)'],
      },
      {
        title: 'Module 4: Zero-Downtime Deployments & Containers',
        duration: '4h 00m',
        lessons: ['Blue-Green with Nginx Reverse Proxies', 'Canary Rollouts with Docker Compose', 'Graceful Shutdown & Drainage'],
      },
    ],
  },
  {
    id: 'devops-containerization',
    slug: 'production-docker-and-containerization',
    title: 'Production Containerization & Micro-architectures',
    category: 'Cloud & DevOps',
    description: 'Build bulletproof multi-stage Dockerfiles, unprivileged non-root Nginx static servers, caching layers, and health probes.',
    level: 'Mastermind',
    duration: '18 hours',
    rating: 4.98,
    studentsCount: 5210,
    progress: 92,
    instructor: {
      name: 'Marcus Vance',
      role: 'Staff DevOps & Infrastructure Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    },
    thumbnailUrl: '/src/assets/images/course_container_devops_1792577192236.jpg',
    accentColor: 'teal',
    modules: [
      {
        title: 'Module 1: Multi-Stage Docker Build Optimization',
        duration: '3h 30m',
        lessons: ['Layer Caching & Order of Manifests', 'Alpine Minimalist Base Images', 'Pruning Build Tools from Runtime'],
      },
      {
        title: 'Module 2: Hardening & Non-Root Execution',
        duration: '4h 15m',
        lessons: ['Nginx Alpine Unprivileged Configuration', 'Handling File Permissions & PID Write Locations', 'Docker Security Profiles'],
      },
      {
        title: 'Module 3: Nginx SPA Routing & Health Probes',
        duration: '5h 00m',
        lessons: ['try_files Fallbacks for Client Routers', 'Static Asset Content-Hash Cache Headers', 'Configuring Liveness & Readiness Probes'],
      },
    ],
  },
  {
    id: 'ai-transformer-mechanics',
    slug: 'attention-mechanisms-and-llms',
    title: 'Modern Large Language Models & Attention Mechanics',
    category: 'Artificial Intelligence',
    description: 'Deconstruct FlashAttention, rotary position embeddings (RoPE), key-value caching, and quantization for production inference.',
    level: 'Intermediate',
    duration: '32 hours',
    rating: 4.92,
    studentsCount: 7600,
    progress: 45,
    instructor: {
      name: 'Dr. Kevin Zhao',
      role: 'Research Scientist, Deep Learning',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    thumbnailUrl: '/src/assets/images/course_ai_transformer_1792577192159.jpg',
    accentColor: 'violet',
    modules: [
      {
        title: 'Module 1: Scaled Dot-Product & Multi-Head Attention',
        duration: '6h 00m',
        lessons: ['Query, Key, Value Projections', 'Softmax Temperature Scaling', 'Causal Masking for Autoregressive Generation'],
      },
      {
        title: 'Module 2: Positional Encodings & RoPE',
        duration: '5h 30m',
        lessons: ['Absolute vs Relative Encodings', 'Rotary Embedding Complex Coordinates', 'Context Length Extrapolation'],
      },
      {
        title: 'Module 3: Inference Acceleration & KV Caching',
        duration: '7h 15m',
        lessons: ['Memory Footprint of KV Caches', 'FlashAttention GPU Kernel Principles', 'PagedAttention & Continuous Batching'],
      },
    ],
  },
  {
    id: 'physics-quantum-computing',
    slug: 'quantum-algorithms-and-qubits',
    title: 'Quantum Mechanics & Computational Circuitry',
    category: 'Physics & Quantum',
    description: 'Explore state superposition, entanglement, Bloch sphere rotations, Shor algorithm, and quantum error mitigation.',
    level: 'Mastermind',
    duration: '24 hours',
    rating: 4.89,
    studentsCount: 2190,
    progress: 25,
    instructor: {
      name: 'Prof. Amara Osei',
      role: 'Chair of Quantum Information Science',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    },
    thumbnailUrl: '/src/assets/images/course_quantum_computing_1792577193298.jpg',
    accentColor: 'cyan',
    modules: [
      {
        title: 'Module 1: Mathematical Foundations of Qubits',
        duration: '5h 00m',
        lessons: ['Hilbert Spaces & Dirac Bra-Ket Notation', 'Unitary Transformations', 'Bloch Sphere State Representation'],
      },
      {
        title: 'Module 2: Quantum Gates & Multi-Qubit Entanglement',
        duration: '6h 30m',
        lessons: ['Hadamard, Pauli-X/Y/Z, CNOT Gates', 'Bell States & Quantum Teleportation Protocol', 'No-Cloning Theorem Proof'],
      },
      {
        title: 'Module 3: Quantum Supremacy Algorithms',
        duration: '7h 00m',
        lessons: ['Grover Search Algorithm', 'Quantum Phase Estimation', 'Shor Factoring Principles'],
      },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Docker & Containerization',
    difficulty: 'Mastermind',
    question: 'Why is it critical to place `COPY package.json package-lock.json* ./` and `RUN npm ci` before `COPY . .` in a Dockerfile?',
    options: [
      'It prevents npm from compiling TypeScript source files prematurely.',
      'It maximizes Docker layer caching so dependencies are only re-installed when package manifests change.',
      'Nginx requires package files to be stored at the root of the file system.',
      'It automatically generates a non-root Linux user for Alpine execution.',
    ],
    correctIndex: 1,
    explanation:
      'Docker caches image layers by hash. By copying only package manifests before installing dependencies, Docker reuses the cached node_modules layer whenever you edit application source code, reducing build time from minutes to milliseconds.',
  },
  {
    id: 'q2',
    topic: 'Nginx Architecture',
    difficulty: 'Mastermind',
    question: 'In a React SPA served by Nginx, why is `try_files $uri $uri/ /index.html;` required for production routing?',
    options: [
      'To compress JavaScript chunks with gzip before serving them to the client.',
      'To prevent the server from returning 404 Not Found when a user reloads a client-side route like `/courses`.',
      'To verify the SSL/TLS certificate chain on every HTTPS request.',
      'To prevent cross-site request forgery attacks on POST endpoints.',
    ],
    correctIndex: 1,
    explanation:
      'In a Single-Page Application, routes like `/courses` or `/mastery-arena` exist only in browser memory via HTML5 History pushState. Because no physical `/courses` file exists on disk, Nginx must fall back to serving `index.html`, allowing React Router to mount the view.',
  },
  {
    id: 'q3',
    topic: 'Container Security',
    difficulty: 'Mastermind',
    question: 'When configuring an official `nginx:alpine` container to run safely as non-root user `nginx`, what must be addressed?',
    options: [
      'Nginx must be compiled from source using GCC inside the final container.',
      'Ensure the non-root user has write permissions on the PID file (`/var/run/nginx.pid`) and cache directories (`/var/cache/nginx`).',
      'Port 80 must be changed to port 22 for SSH compatibility.',
      'Remove all static HTML files so they are loaded remotely over S3.',
    ],
    correctIndex: 1,
    explanation:
      'By default, Nginx writes its master process PID to `/var/run/nginx.pid` and uses `/var/cache/nginx`. A non-root user cannot write to root-owned directories unless ownership is granted via `chown -R nginx:nginx` or paths are redirected to `/tmp`.',
  },
  {
    id: 'q4',
    topic: 'Distributed Systems',
    difficulty: 'Challenging',
    question: 'In the Raft consensus protocol, what happens if a follower node does not receive heartbeats from the leader within its randomized election timeout?',
    options: [
      'It immediately commits all pending transactions in its log.',
      'It converts to Candidate state, increments the current term, votes for itself, and broadcasts RequestVote RPCs.',
      'It shuts down its socket connection and exits the cluster permanently.',
      'It requests an Nginx reverse proxy to forward traffic to an alternate leader.',
    ],
    correctIndex: 1,
    explanation:
      'Followers maintain randomized election timers (typically 150-300ms). If no heartbeat is received before timeout, the follower assumes the leader failed, advances to Candidate status, and initiates an election.',
  },
  {
    id: 'q5',
    topic: 'Vite & Build Tooling',
    difficulty: 'Standard',
    question: 'Can you dynamically alter client-side `VITE_API_BASE_URL` on a running production Nginx container simply by editing `.env` on the host?',
    options: [
      'Yes, Nginx automatically watches `.env` files and hot-reloads static assets.',
      'No, `VITE_` variables are statically baked into JavaScript bundles at build time; dynamic runtime values require a public configuration mechanism (e.g. `window.__EDU_CONFIG__`).',
      'Yes, Vite runs an internal daemon inside Nginx that evaluates process.env per HTTP request.',
      'No, because Alpine Linux does not support environment variables.',
    ],
    correctIndex: 1,
    explanation:
      'Vite replaces `import.meta.env.VITE_*` strings with hardcoded literals during `npm run build`. Once compiled, changes to `.env` have zero effect without rebuilding the image or injecting runtime configuration via scripts/headers.',
  },
];

export const FLASHCARDS: Flashcard[] = [
  {
    id: 'fc-1',
    deck: 'Docker & DevOps',
    term: 'Multi-Stage Docker Build',
    definition: 'A Dockerfile pattern using multiple `FROM` instructions to separate build tools from the final runtime image.',
    conceptDeepDive:
      'The builder stage includes heavy compilers, SDKs, and devDependencies (`node:22-alpine`). The production stage inherits a tiny server (`nginx:1.27-alpine`) and copies only `/app/dist`. The result is an ultra-secure ~25MB image with zero attack surface.',
    difficulty: 'Easy',
  },
  {
    id: 'fc-2',
    deck: 'Docker & DevOps',
    term: 'Docker Healthcheck Directive',
    definition: 'An instruction defining a command executed inside the container to verify the application is actively serving traffic.',
    conceptDeepDive:
      'Using `HEALTHCHECK CMD wget --spider http://127.0.0.1:80/health || exit 1`, Docker monitors the container state (`starting`, `healthy`, `unhealthy`). Orchestrators like Kubernetes or Docker Compose use this to automate rollbacks and traffic routing.',
    difficulty: 'Medium',
  },
  {
    id: 'fc-3',
    deck: 'Distributed Systems',
    term: 'CAP Theorem',
    definition: 'A principle stating that a distributed data store can simultaneously provide at most two out of Consistency, Availability, and Partition Tolerance.',
    conceptDeepDive:
      'Since physical network partitions are unavoidable in real-world networks (P is mandatory), distributed systems must trade off between returning strongly consistent data (CP) or guaranteeing response availability during splits (AP).',
    difficulty: 'Hard',
  },
  {
    id: 'fc-4',
    deck: 'Web Architecture',
    term: 'Cache-Control: immutable',
    definition: 'An HTTP caching directive indicating that the response body will never change over time.',
    conceptDeepDive:
      'Because modern bundlers like Vite append unique content hashes to static asset filenames (e.g. `index-B2x_9a.js`), these files can safely be cached with `max-age=31536000, immutable`, preventing browsers from even sending conditional revalidation requests.',
    difficulty: 'Medium',
  },
  {
    id: 'fc-5',
    deck: 'AI Engineering',
    term: 'FlashAttention',
    definition: 'An IO-aware exact attention algorithm that minimizes memory reads/writes between GPU HBM and SRAM.',
    conceptDeepDive:
      'Standard attention requires materializing an N×N matrix in slow High Bandwidth Memory (HBM). FlashAttention tiles the computation using softmax scaling tricks to compute attention strictly within fast on-chip SRAM, yielding 2-4x speedups.',
    difficulty: 'Hard',
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Container Commander',
    description: 'Mastered multi-stage Docker builds and unprivileged Nginx deployments.',
    icon: 'PackageCheck',
    unlockedAt: '2 hours ago',
    rarity: 'Legendary',
  },
  {
    id: 'ach-2',
    title: 'Consensus Architect',
    description: 'Completed 100% of Distributed Consensus and Raft state machine modules.',
    icon: 'Network',
    unlockedAt: 'Yesterday',
    rarity: 'Epic',
  },
  {
    id: 'ach-3',
    title: 'Streak Titan',
    description: 'Maintained a 7-day mastermind daily study streak.',
    icon: 'Flame',
    unlockedAt: '3 days ago',
    rarity: 'Rare',
  },
  {
    id: 'ach-4',
    title: 'Zero-Downtime Guru',
    description: 'Configured automated health probes and graceful drainage.',
    icon: 'ShieldCheck',
    unlockedAt: '5 days ago',
    rarity: 'Common',
  },
];
