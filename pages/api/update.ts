// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '../interfaces/todos.d'
import { todos } from '../database/todo'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ITodo[]>
) {
    if (req.body.todo) {
        const index = todos.findIndex(todo => todo._id === req.body.todo._id);

        if (index >= 0) {
            todos[index] = {
                ...todos[index],
                ...req.body.todo
            }
        }
    }

    res.status(200).json(todos);
}
