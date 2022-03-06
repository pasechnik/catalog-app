import { isSpeciality, isSpecialityArray } from './specialties';

describe('isSpeciality', () => {
  it('should return false for undefined', () => {
    expect(isSpeciality(undefined)).toBe(false);
  });
  it('should return false for blblblbl', () => {
    expect(isSpeciality('blblblbl')).toBe(false);
  });
  it('should return true for "excavation"', () => {
    expect(isSpeciality('excavation')).toBe(true);
  });
  it('should return true for "plumbing"', () => {
    expect(isSpeciality('plumbing')).toBe(true);
  });
  it('should return true for "electrical"', () => {
    expect(isSpeciality('electrical')).toBe(true);
  });
});

describe('isSpecialityArray', () => {
  it('should return false for undefined', () => {
    expect(isSpecialityArray(undefined)).toBe(false);
  });
  it('should return true for empty array', () => {
    expect(isSpecialityArray([])).toBe(true);
  });
  it('should return false for wrong array', () => {
    expect(isSpecialityArray(['blblblbl'])).toBe(false);
  });
  it('should return false for "excavation" array', () => {
    expect(isSpecialityArray(['excavation'])).toBe(true);
  });
  it('should return false for "plumbing" array', () => {
    expect(isSpecialityArray(['plumbing'])).toBe(true);
  });
  it('should return false for "electrical" array', () => {
    expect(isSpecialityArray(['electrical'])).toBe(true);
  });
  it('should return false for wrong "excavation" array', () => {
    expect(isSpecialityArray(['excavation', 'blblblb'])).toBe(false);
  });
  it('should return false for wrong "plumbing" array', () => {
    expect(isSpecialityArray(['blblblb', 'plumbing'])).toBe(false);
  });
  it('should return false for wrong "electrical" array', () => {
    expect(isSpecialityArray(['electrical', 'blblblb', 'plumbing'])).toBe(false);
  });
  it('should return true for full array', () => {
    expect(isSpecialityArray(['electrical', 'excavation', 'plumbing'])).toBe(true);
  });
});
