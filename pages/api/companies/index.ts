import {
  Company,
  CompanyNewRequest,
  ErrorResponse,
  errorResponse,
  getAllCompanies,
  HttpStatusCode,
  isCompanyNewRequest,
  prepareNewCompanyEntity,
  saveCompany,
} from '../../../data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Company[] | Company | ErrorResponse>) {
  try {
    if (req.method === 'POST') {
      let { company } = req.body as { company: Partial<CompanyNewRequest> | undefined };
      // Process a POST request
      if (!isCompanyNewRequest(company)) {
        res.status(HttpStatusCode.BAD_REQUEST).json(errorResponse(`Bad request`));
        return;
      }

      const preparedCompany: Company = await prepareNewCompanyEntity(company);
      const savedCompany = await saveCompany(preparedCompany);
      if (savedCompany !== undefined) {
        res.status(HttpStatusCode.OK).json(savedCompany);
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(errorResponse('Error saving company'));
      }
      return;
    }

    if (req.method === 'GET') {
      // Handle any other HTTP method
      const { q } = req.query;
      const companies = await getAllCompanies(q);
      res.status(HttpStatusCode.OK).json(companies);
      return;
    }

    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json(errorResponse(`Method is not allow`));
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(errorResponse((err as Error).message));
  }
}
