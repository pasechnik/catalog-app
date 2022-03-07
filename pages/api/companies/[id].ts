import {
  Company,
  deleteCompany,
  errorResponse,
  ErrorResponse,
  getCompany,
  HttpStatusCode,
  isCompanyUpdateRequest,
  prepareUpdatedCompanyEntity,
  saveCompany,
} from '../../../data';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function personHandler(req: NextApiRequest, res: NextApiResponse<Company | ErrorResponse>) {
  const { id } = req.query as { id: string };
  try {
    const targetCompany = await getCompany(id);
    if (targetCompany === undefined) {
      // User with id does not exist
      res.status(HttpStatusCode.NOT_FOUND).json(errorResponse(`Company with id: ${id} is not found.`));
      return;
    }

    if (req.method === 'GET') {
      // User with id exists
      res.status(HttpStatusCode.OK).json(targetCompany);
      return;
    }

    if (req.method === 'PUT') {
      let { company } = req.body as { company: Partial<Company> | undefined };
      if (!isCompanyUpdateRequest(company)) {
        res.status(HttpStatusCode.BAD_REQUEST).json(req.body);
        return;
      }

      const preparedCompany: Company = await prepareUpdatedCompanyEntity(company);
      const savedCompany: Company | undefined = await saveCompany(preparedCompany);
      if (savedCompany !== undefined) {
        res.status(HttpStatusCode.OK).json(savedCompany);
      } else {
        res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(errorResponse('Error saving company data'));
      }
      return;
    }

    if (req.method === 'DELETE') {
      await deleteCompany(id);
      res.status(HttpStatusCode.OK).json(targetCompany);
      return;
    }

    res.status(HttpStatusCode.METHOD_NOT_ALLOWED).json(errorResponse(`Method is not allow`));
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(errorResponse((e as Error).message));
  }
}
