// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ITodo } from '../interfaces/todos'
import { todos } from '../database/todo'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ITodo[]>
) {
    const index = todos.findIndex(todo => todo._id === req.body._id)

    if (index >= 0) {
        todos.splice(index, 1);
    }

    res.status(200).json(todos);
}
