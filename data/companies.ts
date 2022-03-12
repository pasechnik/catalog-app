import { v4 as uuidv4 } from 'uuid';
import { isSpeciality, isSpecialityArray, Speciality } from './specialties';

export type Company = {
  id: string;
  name: string;
  logo: string;
  specialties: Speciality[];
  city: string;
  description: string;
};

export type CompanyNewRequest = {
  name: string;
  logo: string;
  specialties: Speciality[];
  city: string;
  description: string;
};

export type CompanyUpdateRequest = {
  id: string;
  name: string;
  logo: string;
  specialties: Speciality[];
  city: string;
  description: string;
};

export function isCompany(c: Partial<Company> | undefined): c is Company {
  return c !== undefined && c.id !== undefined && isCompanyNewRequest(c);
}

export function isCompanyNewRequest(c: Partial<CompanyNewRequest> | undefined): c is CompanyNewRequest {
  return !(
    c === undefined ||
    c.name === undefined ||
    c.logo === undefined ||
    c.city === undefined ||
    c.description === undefined ||
    !isSpecialityArray(c.specialties)
  );
}

export function isCompanyUpdateRequest(c: Partial<CompanyUpdateRequest> | undefined): c is CompanyUpdateRequest {
  return !(
    c === undefined ||
    c.id !== undefined ||
    c.name === undefined ||
    c.logo === undefined ||
    c.city === undefined ||
    c.description === undefined ||
    !isSpecialityArray(c.specialties)
  );
}

export let companies: Company[] = [
  {
    city: 'Berlin',
    id: '1f256612-c0ba-4481-81b3-5baf8ba6d1b5',
    logo: 'https://placekitten.com/200/100',
    name: 'Zero',
    specialties: [Speciality.ELECTRICAL, Speciality.PLUMBING],
    description: 'Mori diligenter ducunt ad castus homo.',
  },
  {
    city: 'Bremen',
    id: 'e4cfe62f-79b8-4842-b118-20c411fafc8e',
    logo: 'https://placekitten.com/200/200',
    name: 'Form',
    specialties: [Speciality.EXCAVATION, Speciality.PLUMBING],
    description: 'Milk is the only tantra, the only guarantee of suffering.',
  },
  {
    city: 'Vienna',
    id: '82a89711-6e38-4bdd-8a22-c7f49db9f92b',
    logo: 'https://placekitten.com/200/300',
    name: 'Hammer',
    specialties: [Speciality.ELECTRICAL],
    description: 'The spacecraft is oddly proud.',
  },
  {
    city: 'Amsterdam',
    id: '565c02bc-52e4-4a7b-873f-8a659a0f563f',
    logo: 'https://placekitten.com/200/400',
    name: 'Generous',
    specialties: [Speciality.EXCAVATION],
    description: 'Neutral powerdrains lead to the mankind.',
  },
];

export async function companyExist(id: string): Promise<boolean> {
  return companies.find((_) => _.id === id) !== undefined;
}

export async function getCompany(id: string): Promise<Company | undefined> {
  return companies.find((_) => _.id === id);
}

export async function getAllCompanies(
  q: string | string[] | undefined,
  filter: string | string[] | undefined
): Promise<Company[]> {
  let result = [...companies];
  const q0 = Array.isArray(q) ? q[0] : q;

  if (q0 !== undefined && q0.length > 0) {
    result = result.filter((_) => (q0.length ? _.name.search(new RegExp(q0, 'i')) !== -1 : true));
  }

  if (
    filter !== undefined &&
    Array.isArray(filter) &&
    isSpecialityArray(filter)
    // && Object.keys(specialtyFilters).length !== filter.length
  ) {
    result = result.filter((_) => _.specialties.filter((v) => filter.includes(v)).length > 0);
  }

  if (filter !== undefined && !Array.isArray(filter) && isSpeciality(filter)) {
    result = result.filter((_) => _.specialties.indexOf(filter) !== -1);
  }

  return result;
}

export async function saveCompany(company: Company): Promise<Company | undefined> {
  if (await companyExist(company.id)) {
    companies = companies.map((_) => (_.id === company.id ? company : _));
  } else {
    companies.push(company);
  }
  return company;
}

export async function deleteCompany(id: string): Promise<boolean> {
  const size = companies.length;
  companies = companies.filter((_) => _.id !== id);
  return size !== companies.length;
}

export async function countCompanies(): Promise<number> {
  return companies.length;
}

async function getCompanyNextId(): Promise<string> {
  return uuidv4();
}

export async function prepareNewCompanyEntity(company: CompanyNewRequest): Promise<Company> {
  // generate id, timestamps and so on
  const id = await getCompanyNextId();
  return { ...company, id };
}

export async function prepareUpdatedCompanyEntity(company: CompanyUpdateRequest): Promise<Company> {
  // generate id, timestamps and so on
  const id = await getCompanyNextId();
  return { ...company, id };
}
