import { useState, useEffect } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";
import { todoApi } from "./services/api";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from backend on mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoApi.getAllTodos();
      // Add expanded property for frontend UI state
      const todosWithExpanded = fetchedTodos.map(todo => ({
        ...todo,
        expanded: false
      }));
      setTodos(todosWithExpanded);
    } catch (err) {
      console.error('Error loading todos:', err);
      setError('Failed to load todos. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (newTodoItem: Todo): Promise<void> => {
    try {
      setError(null);
      const createdTodo = await todoApi.createTodo({
        text: newTodoItem.text,
        description: newTodoItem.description
      });
      // Add expanded property and prepend to list
      setTodos([{ ...createdTodo, expanded: false }, ...todos]);
    } catch (err) {
      console.error('Error creating todo:', err);
      setError('Failed to create todo');
    }
  };

  const deleteTodo = async (id: number): Promise<void> => {
    try {
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError('Failed to delete todo');
    }
  };

  const toggleTodo = async (id: number): Promise<void> => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      setError(null);
      const updatedTodo = await todoApi.updateTodo(id, {
        completed: !todo.completed
      });
      setTodos(
        todos.map((t) =>
          t.id === id ? { ...updatedTodo, expanded: t.expanded } : t
        )
      );
    } catch (err) {
      console.error('Error updating todo:', err);
      setError('Failed to update todo');
    }
  };

  const toggleDescription = (id: number): void => {
    // This is frontend-only, no API call needed
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, expanded: !todo.expanded } : todo
      )
    );
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="title">todo list</h1>
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">todo list</h1>

      {error && (
        <div style={{ 
          padding: '10px', 
          marginBottom: '10px', 
          backgroundColor: '#fee', 
          border: '1px solid #fcc',
          borderRadius: '4px',
          color: '#c00'
        }}>
          {error}
        </div>
      )}

      <AddTodo onAddTodo={addTodo} />

      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onToggleDescription={toggleDescription}
      />
    </div>
  );
}

export default App;

