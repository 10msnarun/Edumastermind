/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

declare global {
  interface Window {
    __EDU_CONFIG__?: {
      appName?: string;
      environment?: string;
      containerPort?: number;
      hostPort?: number;
      apiBaseUrl?: string;
      version?: string;
    };
  }
}

/**
 * Public configuration helper.
 * Safely resolves configuration by prioritizing runtime window.__EDU_CONFIG__
 * before falling back to Vite build-time import.meta.env.
 */
export const AppConfig = {
  appName:
    window.__EDU_CONFIG__?.appName ||
    import.meta.env.VITE_APP_TITLE ||
    'EduMastermind',
  environment:
    window.__EDU_CONFIG__?.environment ||
    import.meta.env.VITE_APP_ENV ||
    'production',
  apiBaseUrl:
    window.__EDU_CONFIG__?.apiBaseUrl ||
    import.meta.env.VITE_API_BASE_URL ||
    'https://api.edumastermind.internal/v1',
  containerPort: window.__EDU_CONFIG__?.containerPort || 80,
  hostPort: window.__EDU_CONFIG__?.hostPort || 8080,
  version: window.__EDU_CONFIG__?.version || '1.0.0',
  isProduction: import.meta.env.PROD,
};
