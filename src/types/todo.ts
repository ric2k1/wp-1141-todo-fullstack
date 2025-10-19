export interface Todo {
  id: number;
  text: string;
  description: string;
  completed: boolean;
  expanded: boolean;
}

export type AddTodoHandler = (todo: Todo) => void;
export type DeleteTodoHandler = (id: number) => void;
export type ToggleTodoHandler = (id: number) => void;
export type ToggleDescriptionHandler = (id: number) => void;

