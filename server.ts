import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { db } from './src/db/index.ts';
import * as schema from './src/db/schema.ts';
import { eq, desc } from 'drizzle-orm';
import { optionalAuth, AuthRequest } from './src/middleware/auth.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Routes

// 1. Leads
app.get('/api/leads', async (_req: Request, res: Response) => {
  try {
    const allLeads = await db.select().from(schema.leads).orderBy(desc(schema.leads.createdAt));
    res.json(allLeads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

app.post('/api/leads', async (req: Request, res: Response) => {
  try {
    const {
      name,
      phone,
      email,
      propertyInterestId,
      propertyTitle,
      budget,
      dealType,
      preferredTime,
      message,
      source,
    } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required' });
    }

    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const id = `lead-${Date.now()}`;

    const newLead = {
      id,
      name,
      phone,
      email: email || null,
      propertyInterestId: propertyInterestId || null,
      propertyTitle: propertyTitle || 'Umumiy Loyiha',
      budget: budget || '$250,000 - $500,000',
      dealType: dealType || 'offplan',
      preferredTime: preferredTime || "15 daqiqada bog'lanish",
      message: message || null,
      status: 'new',
      managerAssigned: null,
      notes: null,
      source: source || 'Veb-sayt arizasi',
      createdAt: timeStr,
    };

    await db.insert(schema.leads).values(newLead);

    // Record audit log
    await db.insert(schema.auditLogs).values({
      id: `log-${Date.now()}`,
      user: 'Mijoz (Sayt)',
      role: 'GUEST',
      action: 'Yangi ariza kelib tushdi',
      target: `${name} (${phone})`,
      timestamp: timeStr,
    });

    res.status(201).json(newLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Failed to create lead' });
  }
});

app.patch('/api/leads/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, managerAssigned, notes } = req.body;

    const updates: Record<string, any> = {};
    if (status !== undefined) updates.status = status;
    if (managerAssigned !== undefined) updates.managerAssigned = managerAssigned;
    if (notes !== undefined) updates.notes = notes;

    await db.update(schema.leads).set(updates).where(eq(schema.leads.id, id));
    res.json({ success: true, id, updates });
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Failed to update lead' });
  }
});

app.delete('/api/leads/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(schema.leads).where(eq(schema.leads.id, id));
    res.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Failed to delete lead' });
  }
});

// 2. Properties
app.get('/api/properties', async (_req: Request, res: Response) => {
  try {
    const allProps = await db.select().from(schema.properties);
    res.json(allProps);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

app.post('/api/properties', async (req: Request, res: Response) => {
  try {
    const prop = req.body;
    const id = prop.id || `prop-${Date.now()}`;
    const createdAt = new Date().toISOString().split('T')[0];

    const newProp = {
      id,
      title: prop.title,
      description: prop.description || '',
      price: Number(prop.price) || 0,
      location: prop.location || 'Dubay, BAA',
      dealType: prop.dealType || 'sale',
      category: prop.category || 'apartments',
      bedrooms: Number(prop.bedrooms) || 1,
      bathrooms: Number(prop.bathrooms) || 1,
      area: Number(prop.area) || 50,
      roi: prop.roi || null,
      handoverDate: prop.handoverDate || null,
      paymentPlan: prop.paymentPlan || null,
      images: Array.isArray(prop.images) ? JSON.stringify(prop.images) : (prop.images || '[]'),
      featured: Boolean(prop.featured),
      isAzizi: Boolean(prop.isAzizi),
      status: prop.status || 'available',
      createdAt,
    };

    await db.insert(schema.properties).values(newProp);
    res.status(201).json(newProp);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

app.delete('/api/properties/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(schema.properties).where(eq(schema.properties.id, id));
    res.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

// 3. Categories
app.get('/api/categories', async (_req: Request, res: Response) => {
  try {
    const allCategories = await db.select().from(schema.categories);
    res.json(allCategories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.post('/api/categories', async (req: Request, res: Response) => {
  try {
    const { nameUz, nameRu, nameEn, nameTg, iconName } = req.body;
    const id = `cat-${Date.now()}`;
    const newCat = {
      id,
      nameUz: nameUz || '',
      nameRu: nameRu || '',
      nameEn: nameEn || '',
      nameTg: nameTg || '',
      iconName: iconName || 'Building',
    };
    await db.insert(schema.categories).values(newCat);
    res.status(201).json(newCat);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
});

app.delete('/api/categories/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(schema.categories).where(eq(schema.categories.id, id));
    res.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

// 4. Expenses
app.get('/api/expenses', async (_req: Request, res: Response) => {
  try {
    const allExpenses = await db.select().from(schema.expenses);
    res.json(allExpenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

app.post('/api/expenses', async (req: Request, res: Response) => {
  try {
    const { title, category, amount, date, paidBy, notes } = req.body;
    const id = `exp-${Date.now()}`;
    const newExp = {
      id,
      title,
      category: category || 'Boshqa',
      amount: Number(amount) || 0,
      date: date || new Date().toISOString().split('T')[0],
      paidBy: paidBy || null,
      notes: notes || null,
    };
    await db.insert(schema.expenses).values(newExp);
    res.status(201).json(newExp);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

app.delete('/api/expenses/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await db.delete(schema.expenses).where(eq(schema.expenses.id, id));
    res.json({ success: true, id });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// 5. Audit Logs
app.get('/api/audit-logs', async (_req: Request, res: Response) => {
  try {
    const logs = await db.select().from(schema.auditLogs).orderBy(desc(schema.auditLogs.timestamp));
    res.json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

app.post('/api/audit-logs', async (req: Request, res: Response) => {
  try {
    const { user, role, action, target } = req.body;
    const now = new Date();
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newLog = {
      id: `log-${Date.now()}`,
      user: user || 'Tizim',
      role: role || 'ADMIN',
      action,
      target,
      timestamp: timeStr,
    };
    await db.insert(schema.auditLogs).values(newLog);
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error creating audit log:', error);
    res.status(500).json({ error: 'Failed to create audit log' });
  }
});

// Vite dev server mounting
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api')) {
        return next();
      }
      try {
        const fs = await import('fs');
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
