import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function ordersApiPlugin(): Plugin {
  const ordersFile = path.resolve(__dirname, 'data/campus_orders.json');
  
  const getOrders = (): any[] => {
    try {
      if (!fs.existsSync(ordersFile)) {
        fs.mkdirSync(path.dirname(ordersFile), { recursive: true });
        fs.writeFileSync(ordersFile, JSON.stringify([]), 'utf-8');
        return [];
      }
      const data = fs.readFileSync(ordersFile, 'utf-8');
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const saveOrders = (orders: any[]) => {
    try {
      fs.mkdirSync(path.dirname(ordersFile), { recursive: true });
      fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save orders to file:', e);
    }
  };

  return {
    name: 'campus-orders-api',
    configureServer(server) {
      server.middlewares.use('/api/health', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({ status: 'ok', ordersCount: getOrders().length }));
      });

      server.middlewares.use('/api/orders', (req, res) => {
        const method = req.method || 'GET';

        res.setHeader('Content-Type', 'application/json');

        if (method === 'GET') {
          const orders = getOrders();
          res.statusCode = 200;
          res.end(JSON.stringify(orders));
          return;
        }

        if (method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const newOrder = JSON.parse(body);
              const currentOrders = getOrders();
              const existingIndex = currentOrders.findIndex(o => o.id === newOrder.id);
              let updated;
              if (existingIndex >= 0) {
                currentOrders[existingIndex] = newOrder;
                updated = currentOrders;
              } else {
                updated = [newOrder, ...currentOrders];
              }
              saveOrders(updated);
              res.statusCode = 201;
              res.end(JSON.stringify(newOrder));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid order payload' }));
            }
          });
          return;
        }

        if (method === 'PATCH') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', () => {
            try {
              const { orderId, newStatus } = JSON.parse(body);
              const currentOrders = getOrders();
              const updated = currentOrders.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
              saveOrders(updated);
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, orderId, newStatus }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid update payload' }));
            }
          });
          return;
        }

        if (method === 'DELETE') {
          saveOrders([]);
          res.statusCode = 200;
          res.end(JSON.stringify({ success: true, orders: [] }));
          return;
        }

        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });
    }
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), ordersApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
