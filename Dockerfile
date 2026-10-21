# ==============================================================================
# EduMastermind Web - Multi-Stage Production Dockerfile
# Stage 1: Build static assets using Node.js LTS Alpine
# Stage 2: Serve production assets with lightweight, non-root Nginx Alpine
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build Environment
# ------------------------------------------------------------------------------
FROM node:22-alpine AS builder

# Set working directory inside container
WORKDIR /app

# Copy package manifests first to leverage Docker layer caching
COPY package.json package-lock.json* ./

# Install dependencies using lockfile for reproducible, clean builds
# Falls back to npm install if lockfile is absent during standalone build
RUN if [ -f package-lock.json ]; then \
      npm ci --ignore-scripts; \
    else \
      npm install --ignore-scripts; \
    fi

# Copy the application source code
COPY . .

# Build the Vite production bundle (output to /app/dist)
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production Nginx Server
# ------------------------------------------------------------------------------
FROM nginx:1.27-alpine AS production

# Metadata labels
LABEL maintainer="EduMastermind DevOps Team"
LABEL description="EduMastermind Web Production Container"
LABEL version="1.0.0"

# Set working directory to Nginx document root
WORKDIR /usr/share/nginx/html

# Clean up default Nginx boilerplate files
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Configure directory permissions and PID file for non-root execution (security hardening)
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid /var/cache/nginx /var/log/nginx /etc/nginx/conf.d /usr/share/nginx/html

# Switch to the non-root 'nginx' user (UID 101)
USER nginx

# Expose HTTP port 80
EXPOSE 80

# Health check to verify that Nginx responds with HTTP 200 on /health
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:80/health || exit 1

# Launch Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
