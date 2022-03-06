import { errorResponse, ErrorResponse, HttpStatusCode, people, Person } from '../../../data';
import { NextApiResponse } from 'next';

export default async function personHandler(
  { query: { id } }: { query: { id: string } },
  res: NextApiResponse<Person | ErrorResponse>
) {
  try {
    const filtered = people.find((p) => p.id === id);

    // User with id exists
    if (filtered !== undefined) {
      res.status(HttpStatusCode.OK).json(filtered);
    } else {
      res.status(HttpStatusCode.NOT_FOUND).json(errorResponse(`Person with id: ${id} is not found.`));
    }
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(errorResponse((e as Error).message));
  }
}
