import { Specialities } from './specialties';

export type Company = {
  id: string;
  name: string;
  logo: string;
  specialties: Specialities[];
  city: string;
};

export const companies: Company[] = [];
