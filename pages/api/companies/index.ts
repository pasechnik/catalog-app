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

export type ApiGetRequest = { q: string | string[] | undefined; filter: string | string[] | undefined };
export type ApiPostRequest = { company: Partial<CompanyNewRequest> | undefined };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Company[] | Company | ErrorResponse>) {
  try {
    if (req.method === 'POST') {
      // Process a POST request
      let { company } = req.body as ApiPostRequest;
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
      const { q, filter } = req.query as ApiGetRequest;
      const companies = await getAllCompanies(q, filter);
      res.status(HttpStatusCode.OK).json(companies);
      return;
    }

    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json(errorResponse(`Method is not allow`));
  } catch (err) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(errorResponse((err as Error).message));
  }
}
