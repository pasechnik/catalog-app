import { Company, companies, HttpStatusCode } from '../../../data';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<Company[]>) {
  const { company } = req.body as { company: Partial<Company> | undefined };
  if (req.method === 'POST') {
    // Process a POST request
    if (company === undefined) {
      res.status(HttpStatusCode.BAD_REQUEST).json(req.body);
    }

    res.status(HttpStatusCode.OK).json(req.body);
  } else {
    // Handle any other HTTP method
    res.status(HttpStatusCode.OK).json(companies);
  }
}
