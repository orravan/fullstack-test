import React, { useEffect, useState } from 'react';
import { IAddTodo, IActions, ITodo, StateEnum } from '../../pages/interfaces/todos.d';

/**
 * Form to add / update a todo list
 * 
 * @param props 
 * 
 * @returns 
 */
export const TodoForm = (props: ITodo & IActions) => {
  const [label, setLabel] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [state, setState] = useState<StateEnum>(StateEnum.TODO);

  /**
   * Get all state enums
   * 
   * @param enumState 
   * 
   * @returns 
   */
  const getStateEnums = (): Array<keyof StateEnum> => {
    return Object.keys(StateEnum) as Array<keyof StateEnum>;
  };

  const dispatchTodo = async (todo: IAddTodo | ITodo, action: 'add' | 'update') => {
    const res =  await fetch(`/api/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({todo: todo})
    });
    const todos = await res.json();

    props.setTodos(todos);
  }

  const isUpdateMode = () => { return props._id !== ''};

  const submitForm = (e: any) => {
    e.preventDefault();

    dispatchTodo({label, description, state, ...(isUpdateMode() && { _id: props._id })}, isUpdateMode() ? 'update' : 'add');
  }

  useEffect(() =>  {
    setLabel(props.label || '');
    setDescription(props.description);
    setState(props.state)
  }, [props.label, props.description, props.state]);

  return (
    <form onSubmit={submitForm}>
      <span>Todo form</span>
          <p>
            <label htmlFor='label'>Label</label>
            <input type="text" id="label" name="label" value={label} onChange={(e) =>setLabel(e.target.value)} />
          </p>
          <p>
            <label htmlFor='description'>Description</label>
            <textarea id="description" name="description" value={description} onChange={(e) =>setDescription(e.target.value)} />
          </p>
          <p>
            <label htmlFor='state'>State</label>
            <select value={state} onChange={(e) => setState(e.target.value as StateEnum)}>
              {
                getStateEnums().map((key: keyof StateEnum, index: number) => (
                  <option key={index} value={StateEnum[key as keyof typeof StateEnum]}>{StateEnum[key as keyof typeof StateEnum] }</option>
                ))
              }
            </select>
          </p>
          <input type="submit" value={ isUpdateMode() ? "Edit" : "Add"} />
          { isUpdateMode() && <button onClick={() => props.reset()}>Cancel</button> }
    </form> 
  );
}