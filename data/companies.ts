import { v4 as uuidv4 } from 'uuid';
import { isSpecialityArray, Speciality } from './specialties';

export type Company = {
  id: string | undefined;
  name: string;
  logo: string;
  specialties: Speciality[];
  city: string;
};

export function isCompany(c: Partial<Company> | undefined): c is Company {
  return !(
    c === undefined ||
    c.name === undefined ||
    c.logo === undefined ||
    c.city === undefined ||
    !isSpecialityArray(c.specialties)
  );
}

export let companies: Company[] = [];

async function getCompanyNextId(): Promise<string> {
  return uuidv4();
}

export async function prepareNewCompanyEntity(company: Company): Promise<Company> {
  // generate id, timestamps and so on
  const id = await getCompanyNextId();
  return { ...company, id };
}
