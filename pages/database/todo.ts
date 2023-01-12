import { ITodo, StateEnum } from "../interfaces/todos.d";

export const todos: ITodo[] = [{
    _id: "1",
    label: "Update one Todo",
    description: "I have to create a system that permit to update the todo",
    createdAt: new Date(),
    state: StateEnum.INPROGRESS,
    updatedAt: undefined,
},
{
    _id: "2",
    label: "Remove one Todo",
    description: "I have to create a system that permit to remove one todo",
    createdAt: new Date(),
    state: StateEnum.TODO,
    updatedAt: undefined,
}];