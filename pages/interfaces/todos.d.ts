export enum StateEnum {
    VALIDATE = 'validate',
    INPROGRESS = 'in-progress',
    BLOCKED = 'blocked',
    TODO= 'todo'
}

export interface ITodo {
    _id: string;
    label?: string;
    description: string;
    createdAt: Date;
    updatedAt?: Date;
    state: StateEnum.VALIDATE | StateEnum.INPROGRESS | StateEnum.BLOCKED | StateEnum.TODO;
}

export type IAddTodo = Pick<ITodo, 'label' | 'description' | 'state'>;

export interface IActions {
    setTodos: Function;
    reset: Function
}

export interface Data {
    todos: ITodos[]
}