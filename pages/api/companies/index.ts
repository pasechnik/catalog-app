import {
  companies,
  Company,
  ErrorResponse,
  errorResponse,
  HttpStatusCode,
  isCompany,
  prepareNewCompanyEntity,
} from '../../../data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Company[] | Company | ErrorResponse>) {
  let { company } = req.body as { company: Partial<Company> | undefined };
  try {
    if (req.method === 'POST') {
      // Process a POST request
      if (!isCompany(company)) {
        res.status(HttpStatusCode.BAD_REQUEST).json(req.body);
        return;
      }

      const preparedCompany = await prepareNewCompanyEntity(company);
      companies.push(preparedCompany);
      res.status(HttpStatusCode.OK).json(company);
    } else {
      // Handle any other HTTP method
      res.status(HttpStatusCode.OK).json(companies);
    }
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(errorResponse((err as Error).message));
  }
}
