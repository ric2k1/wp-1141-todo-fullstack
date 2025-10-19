export interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  expanded: boolean;  // 仅前端使用，不发送到后端
  createdAt?: string;
  updatedAt?: string;
}

export type AddTodoHandler = (todo: Todo) => void;
export type DeleteTodoHandler = (id: number) => void;
export type ToggleTodoHandler = (id: number) => void;
export type ToggleDescriptionHandler = (id: number) => void;

