import { NextApiRequest, NextApiResponse } from "next";

export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Pedro' },
    { id: 2, name: 'Rennan' },
    { id: 3, name: 'Fernando' },
  ]

  return response.json(users)

}