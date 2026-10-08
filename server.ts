import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'campus_orders.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure orders file exists with valid array
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// Helpers for safe file persistence
function readOrders(): any[] {
  try {
    if (!fs.existsSync(ORDERS_FILE)) return [];
    const content = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading orders file:', err);
    return [];
  }
}

function writeOrders(orders: any[]): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${ORDERS_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(orders, null, 2), 'utf-8');
    fs.renameSync(tempFile, ORDERS_FILE);
    return true;
  } catch (err) {
    console.error('Error writing orders file:', err);
    return false;
  }
}

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ESP Campus Food API',
    ordersCount: readOrders().length,
    timestamp: new Date().toISOString()
  });
});

// GET /api/orders - Get all campus orders for any user/device in real time
app.get('/api/orders', (req, res) => {
  try {
    const orders = readOrders();
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.json(orders);
  } catch (err) {
    console.error('Failed to get orders:', err);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

// POST /api/orders - Create or update an order from any phone in the world
app.post('/api/orders', (req, res) => {
  try {
    const newOrder = req.body;
    if (!newOrder || !newOrder.id) {
      return res.status(400).json({ error: 'Order must contain a valid id' });
    }

    const currentOrders = readOrders();
    const existingIndex = currentOrders.findIndex(o => o.id === newOrder.id);
    let updated: any[];

    if (existingIndex >= 0) {
      currentOrders[existingIndex] = {
        ...currentOrders[existingIndex],
        ...newOrder
      };
      updated = currentOrders;
    } else {
      updated = [newOrder, ...currentOrders];
    }

    writeOrders(updated);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Failed to save order:', err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// PATCH /api/orders - Update order delivery status (e.g. from Admin phone)
app.patch('/api/orders', (req, res) => {
  try {
    const { orderId, newStatus } = req.body;
    if (!orderId || !newStatus) {
      return res.status(400).json({ error: 'orderId and newStatus are required' });
    }

    const currentOrders = readOrders();
    const targetOrder = currentOrders.find(o => o.id === orderId);

    if (!targetOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const updated = currentOrders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return o;
    });

    writeOrders(updated);
    res.json({ success: true, orderId, newStatus });
  } catch (err) {
    console.error('Failed to update order status:', err);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// DELETE /api/orders - Reset orders (if needed by admin)
app.delete('/api/orders', (req, res) => {
  try {
    writeOrders([]);
    res.json({ success: true, orders: [] });
  } catch (err) {
    console.error('Failed to reset orders:', err);
    res.status(500).json({ error: 'Failed to reset orders' });
  }
});

// Start server with Vite middleware in development or static dist in production
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // Development mode: attach Vite dev server middleware
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built assets from dist
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`🚀 ESP Campus Food Server running on http://localhost:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
