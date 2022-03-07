import { v4 as uuidv4 } from 'uuid';
import { isSpecialityArray, Speciality } from './specialties';

export type Company = {
  id: string;
  name: string;
  logo: string;
  specialties: Speciality[];
  city: string;
};

export type CompanyNewRequest = {
  name: string;
  logo: string;
  specialties: Speciality[];
  city: string;
};

export type CompanyUpdateRequest = {
  id: string;
  name: string;
  logo: string;
  specialties: Speciality[];
  city: string;
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
    !isSpecialityArray(c.specialties)
  );
}

export let companies: Company[] = [];

export async function companyExist(id: string): Promise<boolean> {
  return companies.find((_) => _.id === id) !== undefined;
}

export async function getCompany(id: string): Promise<Company | undefined> {
  return companies.find((_) => _.id === id);
}

export async function getAllCompanies(): Promise<Company[]> {
  return [...companies];
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
