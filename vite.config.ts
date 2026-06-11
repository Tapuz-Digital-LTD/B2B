import { defineConfig, loadEnv } from 'vite'
import type { Plugin, ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Dev-only bridge: serves /api/catalog through the same handler Vercel runs in
 * production, so plain `npm run dev` shows live catalog data (env from .env.local).
 */
function devCatalogApi(): Plugin {
  return {
    name: 'dev-catalog-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/catalog', (req, res) => {
        void (async () => {
          const { default: handler } = (await server.ssrLoadModule('/api/catalog.ts')) as {
            default: (
              req: { method?: string },
              res: {
                setHeader(name: string, value: string): void
                status(code: number): unknown
                json(body: unknown): void
              },
            ) => Promise<void>
          }
          const shim = {
            setHeader: (name: string, value: string) => res.setHeader(name, value),
            status(code: number) {
              res.statusCode = code
              return shim
            },
            json(body: unknown) {
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(body))
            },
          }
          await handler({ method: req.method }, shim)
        })()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // expose .env/.env.local server vars (Shopify token) to the dev API bridge
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    plugins: [react(), tailwindcss(), devCatalogApi()],
    build: {
      rollupOptions: {
        // one HTML per route so link previews (WhatsApp OG) differ per page
        input: {
          main: 'index.html',
          wallet: 'digital-wallet.html',
          catalog: 'catalog.html',
        },
      },
    },
  }
})
