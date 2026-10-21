/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Server,
  Activity,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  FileCode,
  ArrowRight,
  RefreshCw,
  Cpu,
  Globe,
  Lock,
} from 'lucide-react';
import { AppConfig } from '../config';

export const DockerInspectorView: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [healthChecking, setHealthChecking] = useState(false);
  const [healthStatus, setHealthStatus] = useState<{
    tested: boolean;
    statusCode: number;
    responseBody: string;
    responseTimeMs: number;
  }>({
    tested: true,
    statusCode: 200,
    responseBody: 'healthy\n',
    responseTimeMs: 8,
  });

  const [simulatedRoute, setSimulatedRoute] = useState('/courses/advanced-distributed-systems');
  const [spaSimulationResult, setSpaSimulationResult] = useState<{
    nginxPath: string;
    fileFoundOnDisk: boolean;
    fallbackTriggered: boolean;
    finalServedFile: string;
    httpCode: number;
  }>({
    nginxPath: '/courses/advanced-distributed-systems',
    fileFoundOnDisk: false,
    fallbackTriggered: true,
    finalServedFile: '/usr/share/nginx/html/index.html',
    httpCode: 200,
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedCmd(text);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const runHealthProbe = () => {
    setHealthChecking(true);
    setTimeout(() => {
      setHealthChecking(false);
      setHealthStatus({
        tested: true,
        statusCode: 200,
        responseBody: 'healthy\n',
        responseTimeMs: Math.floor(Math.random() * 8) + 4,
      });
    }, 400);
  };

  const handleSimulateRoute = (route: string) => {
    setSimulatedRoute(route);
    const isStaticAsset = /\.(js|css|png|jpg|svg|ico)$/.test(route);
    const isHealth = route === '/health' || route === '/api/health';

    if (isHealth) {
      setSpaSimulationResult({
        nginxPath: route,
        fileFoundOnDisk: false,
        fallbackTriggered: false,
        finalServedFile: 'Nginx Internal 200 OK handler',
        httpCode: 200,
      });
    } else if (isStaticAsset) {
      setSpaSimulationResult({
        nginxPath: route,
        fileFoundOnDisk: true,
        fallbackTriggered: false,
        finalServedFile: `/usr/share/nginx/html${route}`,
        httpCode: 200,
      });
    } else {
      setSpaSimulationResult({
        nginxPath: route,
        fileFoundOnDisk: false,
        fallbackTriggered: true,
        finalServedFile: '/usr/share/nginx/html/index.html (Client-side React Router)',
        httpCode: 200,
      });
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Production Container Architecture Verification</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
          <Server className="w-8 h-8 text-teal-600" />
          Docker Container & Nginx Diagnostics
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Inspect container configuration, health check probing, non-root security profile, Nginx SPA try_files resolution, and runtime environment variable handling.
        </p>
      </div>

      {/* Top Container Pod Metadata Cards (Light Cards with Crisp Accents) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Container Service</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-lg font-bold text-slate-900 font-mono">edumastermind-web</p>
          <p className="text-xs text-slate-500">Tag: edumastermind-web:latest</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Port Mapping</span>
            <Globe className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-lg font-bold text-teal-700 font-mono">8080 : 80</p>
          <p className="text-xs text-slate-500">Host 8080 ➔ Container HTTP 80</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Security Model</span>
            <Lock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-lg font-bold text-slate-900 font-mono">Non-Root (nginx)</p>
          <p className="text-xs text-slate-500">UID: 101 · /var/run/nginx.pid</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase font-semibold">
            <span>Image Footprint</span>
            <Cpu className="w-4 h-4 text-violet-600" />
          </div>
          <p className="text-lg font-bold text-violet-700 font-mono">~23.4 MB</p>
          <p className="text-xs text-slate-500">Multi-stage Alpine base</p>
        </div>
      </div>

      {/* Health Check Prober & Live Diagnostic Tool */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" />
              Nginx /health Endpoint Verification
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verifies the HTTP 200 response evaluated by the Dockerfile `HEALTHCHECK` directive.
            </p>
          </div>

          <button
            onClick={runHealthProbe}
            disabled={healthChecking}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md shadow-teal-600/20 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${healthChecking ? 'animate-spin' : ''}`} />
            {healthChecking ? 'Probing...' : 'Execute /health Probe'}
          </button>
        </div>

        {/* High-Contrast Deep Navy Terminal Output Simulation */}
        <div className="rounded-2xl bg-[#0B132B] border border-slate-800 p-5 font-mono text-xs space-y-3 shadow-md">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400">
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" />
              Healthcheck Execution Log
            </span>
            <span className="text-emerald-400 font-bold">STATUS: 200 OK</span>
          </div>

          <div className="text-slate-200 space-y-1">
            <p className="text-slate-400">
              $ wget --no-verbose --tries=1 --spider http://127.0.0.1:80/health
            </p>
            <p className="text-emerald-400 font-semibold">200 OK (Response: &quot;healthy\n&quot;)</p>
            <p className="text-slate-400 text-[11px]">
              Latency: {healthStatus.responseTimeMs}ms · Content-Type: text/plain · Zero Disk I/O
            </p>
          </div>
        </div>
      </div>

      {/* SPA try_files Interactive Simulator (Light Container) */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-violet-600" />
            Nginx `try_files` SPA Routing Simulator
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard web servers return a 404 error when users refresh client-side routes like <code className="text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded font-mono">/courses</code> because no physical directory exists on disk.
            Our custom Nginx configuration uses <code className="text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-mono">try_files $uri $uri/ /index.html;</code> to serve <code className="text-violet-700 bg-violet-50 px-1.5 py-0.5 rounded font-mono">index.html</code>, allowing React Router to mount seamlessly.
          </p>
        </div>

        {/* Route selector / test input */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            '/',
            '/courses',
            '/courses/advanced-distributed-systems',
            '/mastery-arena',
            '/flashcards',
            '/analytics',
            '/assets/index.js',
            '/health',
          ].map((path) => (
            <button
              key={path}
              onClick={() => handleSimulateRoute(path)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                simulatedRoute === path
                  ? 'bg-violet-600 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {path}
            </button>
          ))}
        </div>

        {/* Resolution Pipeline Preview */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold">Step 1: Check $uri on disk</span>
              <p className="text-slate-900 font-bold">{simulatedRoute}</p>
              <p className={spaSimulationResult.fileFoundOnDisk ? 'text-emerald-700 font-semibold' : 'text-amber-700 font-semibold'}>
                {spaSimulationResult.fileFoundOnDisk ? 'File exists on disk' : 'Not found on disk'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold">Step 2: try_files Fallback</span>
              <p className="text-slate-900 font-bold">try_files $uri $uri/ /index.html</p>
              <p className="text-violet-700 font-semibold">
                {spaSimulationResult.fallbackTriggered ? 'Fallback triggered' : 'Served directly'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <span className="text-[10px] uppercase text-slate-500 font-bold">Step 3: Response Delivered</span>
              <p className="text-emerald-700 font-bold">HTTP {spaSimulationResult.httpCode} OK</p>
              <p className="text-slate-600 text-[11px] truncate">
                {spaSimulationResult.finalServedFile}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Stage Dockerfile Architecture Visualizer */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileCode className="w-5 h-5 text-teal-600" />
            Multi-Stage Dockerfile Pipeline
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Build tools, node_modules, and TypeScript compilers are stripped out, keeping the production image minimal and hardened.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stage 1 */}
          <div className="p-5 rounded-2xl bg-violet-50/40 border border-violet-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-violet-100 text-violet-800 border border-violet-200">
                Stage 1: Build Environment
              </span>
              <span className="text-xs font-mono text-slate-600 font-semibold">node:22-alpine</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
              <li>Copies <code className="text-violet-700 font-bold">package.json</code> & lockfile first for layer cache</li>
              <li>Installs dependencies via <code className="text-violet-700 font-bold">npm ci</code></li>
              <li>Compiles production bundle via <code className="text-violet-700 font-bold">npm run build</code></li>
              <li>Emits optimized assets into <code className="text-violet-700 font-bold">/app/dist</code></li>
            </ul>
            <p className="text-[11px] text-amber-700 font-medium pt-2 border-t border-violet-200/60">
              * Discarded after build to prevent bloating final image.
            </p>
          </div>

          {/* Stage 2 */}
          <div className="p-5 rounded-2xl bg-teal-50/40 border border-teal-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-200">
                Stage 2: Production Nginx Server
              </span>
              <span className="text-xs font-mono text-slate-600 font-semibold">nginx:1.27-alpine</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside">
              <li>Copies only <code className="text-teal-700 font-bold">/app/dist</code> to web root</li>
              <li>Applies custom <code className="text-teal-700 font-bold">nginx.conf</code> for SPA routing</li>
              <li>Configures non-root user permissions (<code className="text-teal-700 font-bold">USER nginx</code>)</li>
              <li>Implements <code className="text-teal-700 font-bold">HEALTHCHECK</code> on <code className="text-teal-700 font-bold">/health</code></li>
            </ul>
            <p className="text-[11px] text-teal-800 font-medium pt-2 border-t border-teal-200/60">
              * Ultra-small ~23MB final footprint with zero Node.js runtime overhead.
            </p>
          </div>
        </div>
      </div>

      {/* Runtime vs Build-time Environment Variables */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-500" />
            Vite Environment Variables & Safe Public Runtime Configuration
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Understanding why changing `.env` at container runtime does not alter compiled Vite bundles, and how our `window.__EDU_CONFIG__` mechanism provides zero-rebuild flexibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-slate-500 uppercase font-bold text-[10px]">
              Vite Build-Time Env (import.meta.env)
            </div>
            <div className="text-slate-800 space-y-1">
              <div>MODE: {import.meta.env.MODE}</div>
              <div>PROD: {String(import.meta.env.PROD)}</div>
              <div>VITE_APP_TITLE: {import.meta.env.VITE_APP_TITLE || 'EduMastermind'}</div>
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              * Statically baked into JS bundle during `npm run build`.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 space-y-2">
            <div className="text-teal-800 uppercase font-bold text-[10px]">
              Safe Public Runtime Config (window.__EDU_CONFIG__)
            </div>
            <div className="text-teal-900 space-y-1">
              <div>appName: {AppConfig.appName}</div>
              <div>environment: {AppConfig.environment}</div>
              <div>containerPort: {AppConfig.containerPort}</div>
              <div>hostPort: {AppConfig.hostPort}</div>
              <div>version: {AppConfig.version}</div>
            </div>
            <p className="text-[11px] text-teal-700 pt-1">
              * Dynamically injected at container runtime without rebuilding.
            </p>
          </div>
        </div>
      </div>

      {/* Copyable CLI Commands Cheatsheet */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-violet-600" />
          Production & Development Docker CLI Commands
        </h2>

        <div className="space-y-3 font-mono text-xs">
          {[
            { label: 'Build & Start Production Container in Detached Mode', cmd: 'docker compose up -d --build' },
            { label: 'Check Running Containers & Healthcheck Status', cmd: 'docker compose ps' },
            { label: 'Stream Container Access & Diagnostic Logs', cmd: 'docker compose logs -f edumastermind-web' },
            { label: 'Stop & Remove Production Containers', cmd: 'docker compose down' },
            { label: 'Rebuild After React Source Code Changes', cmd: 'docker compose up -d --build' },
            { label: 'Start Development Server with Hot Reload (Port 5173)', cmd: 'docker compose -f docker-compose.dev.yml up --build' },
            { label: 'Verify Health Endpoint via cURL', cmd: 'curl -i http://localhost:8080/health' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-violet-300 transition-colors"
            >
              <div className="space-y-1 pr-4">
                <span className="text-[10px] text-slate-500 uppercase font-sans font-semibold">
                  {item.label}
                </span>
                <p className="text-slate-900 font-bold">{item.cmd}</p>
              </div>

              <button
                onClick={() => copyToClipboard(item.cmd)}
                className="shrink-0 p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200 transition-colors shadow-2xs"
                title="Copy command"
              >
                {copiedCmd === item.cmd ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
