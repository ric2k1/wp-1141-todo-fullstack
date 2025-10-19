import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import todoRoutes from './routes/todoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Todo API Server', 
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', todoRoutes);

// Test database connection
async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  await connectDatabase();
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

