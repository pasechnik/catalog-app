import { Person, people, HttpStatusCode } from '../../../data';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<Person[]>) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    res.status(HttpStatusCode.OK).json(people);
  }
}
