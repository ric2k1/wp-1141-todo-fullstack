import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { createTodoSchema, updateTodoSchema, todoIdSchema } from '../validators/todoSchemas.js';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

// Get all todos
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

// Create a new todo
export const createTodo = async (req: Request, res: Response) => {
  try {
    const validatedData = createTodoSchema.parse(req.body);
    
    const newTodo = await prisma.todo.create({
      data: validatedData
    });
    
    res.status(201).json(newTodo);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    } else {
      console.error('Error creating todo:', error);
      res.status(500).json({ error: 'Failed to create todo' });
    }
  }
};

// Update a todo
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = todoIdSchema.parse({ id: req.params.id });
    const validatedData = updateTodoSchema.parse(req.body);
    
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: validatedData
    });
    
    res.json(updatedTodo);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    } else if ((error as any).code === 'P2025') {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      console.error('Error updating todo:', error);
      res.status(500).json({ error: 'Failed to update todo' });
    }
  }
};

// Delete a todo
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = todoIdSchema.parse({ id: req.params.id });
    
    await prisma.todo.delete({
      where: { id }
    });
    
    res.status(204).send();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ 
        error: 'Validation failed', 
        details: error.errors 
      });
    } else if ((error as any).code === 'P2025') {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      console.error('Error deleting todo:', error);
      res.status(500).json({ error: 'Failed to delete todo' });
    }
  }
};

