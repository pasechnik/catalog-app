export enum Speciality {
  EXCAVATION = 'excavation',
  PLUMBING = 'plumbing',
  ELECTRICAL = 'electrical',
}

export type SpecialtyFiltersType = { [key in Speciality]: boolean };
export const specialtyFilters: SpecialtyFiltersType = {
  [Speciality.EXCAVATION]: false,
  [Speciality.PLUMBING]: false,
  [Speciality.ELECTRICAL]: false,
};

export function isSpeciality(c: string | undefined): c is Speciality {
  if (c === undefined) {
    return false;
  }
  return Object.values(Speciality).includes(c as Speciality);
}

export function isSpecialityArray(c: string[] | undefined): c is Speciality[] {
  if (c === undefined || !Array.isArray(c)) {
    return false;
  }

  return c.reduce<boolean>((previousValue, currentValue) => {
    if (!previousValue) {
      return false;
    }
    return isSpeciality(currentValue);
  }, true);
}
