// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '../interfaces/todos.d'
import { todos } from '../database/todo'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ITodo[]>
) {
    const todoCompleted: ITodo = {
        ...req.body.todo,
        _id: (todos.length + 1).toString(),
        createdAt: new Date()
    }

    todos.push(todoCompleted);

    res.status(200).json(todos);
}
