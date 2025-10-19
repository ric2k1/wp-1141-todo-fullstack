import { Router } from 'express';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';

const router = Router();

// GET /api/todos - Get all todos
router.get('/todos', getAllTodos);

// POST /api/todos - Create a new todo
router.post('/todos', createTodo);

// PUT /api/todos/:id - Update a todo
router.put('/todos/:id', updateTodo);

// DELETE /api/todos/:id - Delete a todo
router.delete('/todos/:id', deleteTodo);

export default router;

