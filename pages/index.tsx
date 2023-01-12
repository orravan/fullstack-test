import { useEffect, useState } from 'react';
import { ITodo, StateEnum } from './interfaces/todos.d';
import { TodoForm } from '../src/components/TodoForm';

export default function Home() {

  const [todos, setTodos] = useState<ITodo[]>([]);
  const [todo, setTodo] = useState<ITodo>();
  const [loading, setLoading] = useState(false);

  const loadTodos = async () => {
    const res = await fetch("/api/list");
    const todos: ITodo[] = await res.json();

    setTodos(todos);
    setLoading(false);
  };

  const removeTodo = async (_id: string) => {
    const res = await fetch("/api/remove", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: _id})
    });
    const todosUpdated: ITodo[] = await res.json();

    setTodos(todosUpdated);
  }

  useEffect(() => {
    const getTodoList  = async () => {
      return await loadTodos();
    }

    getTodoList();
  }, [])

  if (!todos) return "Loading...";
  return (
    <main>
      <div className={"container column height-100vh width-100"}>
        {
          loading ? <h1>content loading</h1> :
            <div className={"todo-wrapper width-30"}>
              {
                todos.map(todo => {
                  return (
                    <div className={"todo"} key={todo._id}>
                      <h2>{todo.label}: {todo._id}</h2>
                      <p>{todo.description}</p>
                      <p>{todo.createdAt.toString()}</p>
                      <p>Status: {todo.state}</p>
                      <button onClick={() => setTodo(todo)}>Edit</button>
                      <button onClick={() => removeTodo(todo._id)}>Remove</button>
                    </div>
                  )
                })}
            </div>
        }
        <div className={"container row width-30"}>
            <TodoForm setTodos={setTodos} label={todo?.label} description={todo?.description || ''} state={todo?.state || StateEnum.TODO} _id={todo?._id || ''} createdAt={todo?.createdAt || new Date()} reset={() => setTodo(undefined)} />
        </div>
      </div>
    </main>
  )
}
