# EduMastermind Web — Containerized Learning Platform

[![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Nginx](https://img.shields.io/badge/Nginx-1.27--Alpine-009639?logo=nginx&logoColor=white)](https://nginx.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

EduMastermind is a containerized, production-grade educational platform featuring interactive mastery curricula, real-time quiz arenas, spaced-repetition flashcards, and deep learning analytics.

The application is containerized with a hardened multi-stage Docker build and served by a non-root Nginx Alpine instance optimized for Single-Page Application (SPA) routing, asset caching, and zero-downtime health probing.

---

## Architecture Overview

```
+-----------------------------------------------------------------------------+
|                          Host Machine / Cloud VM                            |
|                                                                             |
|   Reverse Proxy / Load Balancer (Port 443 HTTPS / Let's Encrypt / ALB)      |
|                                   |                                         |
|                                   v                                         |
|                 Mapped Host Port: http://localhost:8080                     |
+-----------------------------------|-----------------------------------------+
                                    |
                                    v
+-----------------------------------------------------------------------------+
|              Container: edumastermind-web (Port 80)                         |
|                                                                             |
|   +---------------------------------------------------------------------+   |
|   |   Nginx 1.27 Alpine (Non-Root User: UID 101 'nginx')                |   |
|   |                                                                     |   |
|   |   Endpoints:                                                        |   |
|   |   - /health           -> Direct HTTP 200 health probe               |   |
|   |   - /assets/*         -> Static assets with 1-year immutable cache  |   |
|   |   - /                 -> try_files $uri $uri/ /index.html (no-cache)|   |
|   |   - /courses/*        -> Client-side deep links handled seamlessly  |   |
|   +---------------------------------------------------------------------+   |
|                                                                             |
|   +---------------------------------------------------------------------+   |
|   |   Hardened Multi-Stage Build:                                       |   |
|   |   Stage 1: node:22-alpine (npm ci -> npm run build)                 |   |
|   |   Stage 2: nginx:1.27-alpine (dist/ copied, node & tools discarded) |   |
|   +---------------------------------------------------------------------+   |
+-----------------------------------------------------------------------------+
```

---

## Table of Contents
1. [Prerequisites](#1-prerequisites)
2. [Quick Start (Production Container)](#2-quick-start-production-container)
3. [Checking Running Containers & Health](#3-checking-running-containers--health)
4. [Viewing Container Logs](#4-viewing-container-logs)
5. [Rebuilding After Code Changes](#5-rebuilding-after-code-changes)
6. [Stopping Containers](#6-stopping-containers)
7. [Local Development with Docker Compose](#7-local-development-with-docker-compose)
8. [Vite Environment Variables & Runtime Configuration](#8-vite-environment-variables--runtime-configuration)
9. [Deploying Behind HTTPS / Cloud Load Balancers](#9-deploying-behind-https--cloud-load-balancers)
10. [Troubleshooting & Verification](#10-troubleshooting--verification)

---

## 1. Prerequisites

Before running the containerized application, ensure you have installed:
- [Docker Engine](https://docs.docker.com/engine/install/) (v24.0 or later)
- [Docker Compose](https://docs.docker.com/compose/install/) (v2.20 or later / `docker compose` plugin)
- (Optional for local non-container development): Node.js 22 LTS and npm 10+

To verify your installation:
```bash
docker --version
docker compose version
```

---

## 2. Quick Start (Production Container)

To build and start the production-ready EduMastermind container in detached mode:

```bash
docker compose up -d --build
```

### Verify the Website:
Open your browser and navigate to:
**`http://localhost:8080`**

### Direct Docker CLI Alternative:
If you prefer building without Compose:
```bash
# Build the production image
docker build -t edumastermind-web:latest .

# Run the container
docker run -d \
  --name edumastermind-web \
  --restart unless-stopped \
  -p 8080:80 \
  edumastermind-web:latest
```

---

## 3. Checking Running Containers & Health

Check the status, ports, and healthcheck condition of running containers:

```bash
docker compose ps
```

Expected output:
```text
NAME                IMAGE                    COMMAND                  SERVICE             CREATED         STATUS                   PORTS
edumastermind-web   edumastermind-web:latest "/docker-entrypoint.…"   edumastermind-web   5 seconds ago   Up 4 seconds (healthy)   0.0.0.0:8080->80/tcp
```

### Verify the HTTP Health Endpoint:
The Nginx server exposes a dedicated `/health` route for load balancers and orchestrators:
```bash
curl -i http://localhost:8080/health
```

Expected response:
```http
HTTP/1.1 200 OK
Server: nginx/...
Content-Type: text/plain
Content-Length: 8
Connection: keep-alive

healthy
```

You can also inspect container health metadata via the Docker daemon:
```bash
docker inspect --format='{{json .State.Health}}' edumastermind-web
```

---

## 4. Viewing Container Logs

Stream real-time access and diagnostic logs from the container:

```bash
docker compose logs -f edumastermind-web
```

To view the last 100 log lines with timestamps:
```bash
docker compose logs --tail=100 -t edumastermind-web
```

---

## 5. Rebuilding After Code Changes

When you update React source code, CSS, or Docker configurations, recompile the Vite bundle and refresh the Nginx container:

```bash
docker compose up -d --build
```

Docker will intelligently use cached layers for `package.json` manifests, rebuilding only modified code layers in seconds.

---

## 6. Stopping Containers

To stop the running application and remove the container instances:

```bash
docker compose down
```

To stop containers and also remove orphaned containers or volumes:
```bash
docker compose down --volumes --remove-orphans
```

---

## 7. Local Development with Docker Compose

For day-to-day development with Hot Module Replacement (HMR) and host-to-container filesystem bind mounts, use the dedicated development configuration:

```bash
# Start the Vite development container with live reload
docker compose -f docker-compose.dev.yml up --build
```

- **Dev URL:** `http://localhost:5173`
- Source code in `./src` is bind-mounted directly. Changes reflect in your browser instantly.
- To stop the development container:
```bash
docker compose -f docker-compose.dev.yml down
```

---

## 8. Vite Environment Variables & Runtime Configuration

### Build-Time vs Runtime Variables
> **CRITICAL ARCHITECTURAL PRINCIPLE:**
> Vite statically compiles environment variables starting with `VITE_` into the JavaScript bundle **at build time** via `import.meta.env`.
> Modifying `.env` on a running production Nginx container does NOT alter pre-compiled static files without a rebuild (`docker compose up -d --build`).

### Safe Public Runtime Configuration Mechanism
For zero-rebuild dynamic configuration across different environments (e.g. dynamic API gateways in staging vs production), EduMastermind provides a safe public runtime mechanism:

1. `index.html` loads `window.__EDU_CONFIG__`:
```html
<script>
  window.__EDU_CONFIG__ = window.__EDU_CONFIG__ || {
    appName: "EduMastermind",
    environment: "production",
    apiBaseUrl: "/api/v1"
  };
</script>
```

2. At container startup, an orchestration template or volume-mounted `config.js` can inject dynamic values:
```javascript
// /usr/share/nginx/html/config.js
window.__EDU_CONFIG__ = {
  appName: "EduMastermind",
  environment: "production",
  apiBaseUrl: "https://api.yourdomain.com"
};
```

3. The React application inspects `src/config.ts`, cleanly prioritizing `window.__EDU_CONFIG__` before falling back to `import.meta.env`.

---

## 9. Deploying Behind HTTPS / Cloud Load Balancers

As specified in production best practices, SSL/TLS termination should be handled outside the static web container (at the cloud load balancer, Kubernetes Ingress, or fronting reverse proxy).

### Example 1: Nginx Host Reverse Proxy with Let's Encrypt / Certbot

```nginx
# /etc/nginx/sites-available/edumastermind.conf
server {
    listen 80;
    server_name edumastermind.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name edumastermind.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/edumastermind.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/edumastermind.yourdomain.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
}
```

### Example 2: AWS ALB / Cloud Run / Google Cloud Load Balancing
1. Point your DNS A/CNAME record to your cloud load balancer IP or CDN.
2. Terminate SSL on the Load Balancer with an AWS ACM or Google-managed SSL certificate.
3. Configure the target group / backend service to forward traffic to container port 80 (or host port 8080).
4. Configure the health probe path on the Load Balancer to:
   - **Protocol:** HTTP
   - **Path:** `/health`
   - **Healthy threshold:** 2 consecutive 200 responses.

---

## 10. Troubleshooting & Verification

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **Port 8080 already in use** | Another process is bound to host port 8080 | Change `HOST_PORT=8085` in `.env` or run `HOST_PORT=8085 docker compose up -d` |
| **Permission denied on Nginx start** | Non-root permissions misconfigured | Verify Dockerfile has `touch /var/run/nginx.pid` and `chown -R nginx:nginx` |
| **404 error on nested route reload** | Missing Nginx SPA fallback | Verify `try_files $uri $uri/ /index.html;` exists in `nginx.conf` |
| **Health check fails** | `/health` route unreachable | Test with `curl http://localhost:8080/health` |
| **Changes not showing up** | Browser caching old index.html | Nginx sends `no-cache, no-store` on `/index.html` to prevent stale caches. Clear browser cache or hard reload (`Ctrl+Shift+R`). |

---

## License
Apache-2.0 License. Built for modern containerized educational platforms.
