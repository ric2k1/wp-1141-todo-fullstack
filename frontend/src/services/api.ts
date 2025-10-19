import axios from 'axios';
import type { Todo } from '../types/todo';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export interface CreateTodoRequest {
  text: string;
  description?: string;
}

export interface UpdateTodoRequest {
  text?: string;
  description?: string;
  completed?: boolean;
}

export const todoApi = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  },
  
  createTodo: async (data: CreateTodoRequest): Promise<Todo> => {
    const response = await api.post<Todo>('/todos', data);
    return response.data;
  },
  
  updateTodo: async (id: number, data: UpdateTodoRequest): Promise<Todo> => {
    const response = await api.put<Todo>(`/todos/${id}`, data);
    return response.data;
  },
  
  deleteTodo: async (id: number): Promise<void> => {
    await api.delete(`/todos/${id}`);
  }
};

