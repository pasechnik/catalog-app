// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpStatusCode } from '../../data';

type ResponseData = {
  name: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(HttpStatusCode.OK).json({ name: 'John Doe' });
}
