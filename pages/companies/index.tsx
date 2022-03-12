import useSWR from 'swr';
import Head from 'next/head';
import { Company, Speciality, specialtyFilters, SpecialtyFiltersType } from '../../data';
import throttle from 'lodash/throttle';
import { useEffect, useState } from 'react';
import ToolbarComponent from '../../components/ToolbarComponent';
import CompaniesGrid from '../../components/CompaniesGrid';

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((res) => res.json() as Promise<T>);

function joinSpecialties(x: SpecialtyFiltersType, first: string = ''): string {
  const result = Object.entries<boolean>(x).reduce<string>(
    (previousValue, [key, value]) => (value ? `${previousValue}filter=${key}&` : previousValue),
    first
  );
  return result.substring(0, result.length - 1);
}

export default function CompaniesPage() {
  const [filters, setFilters] = useState<SpecialtyFiltersType>({ ...specialtyFilters });
  const [filtersSize, setFiltersSize] = useState(0);
  const [q, setQ] = useState('');
  const [param, setParam] = useState('');
  const { data, error } = useSWR<Company[], unknown>(
    q.length
      ? `/api/companies?q=${param}${joinSpecialties(filters, '&')}`
      : `/api/companies${joinSpecialties(filters, '?')}`,
    fetcher
  );

  const setParamDeb = throttle((q) => {
    setParam(q);
  }, 1000);

  useEffect(() => {
    setParamDeb(q);
  }, [q, setParamDeb]);

  function toggleFilter(x: Speciality): void {
    const newFilters = { ...filters, [x]: !filters[x] };
    const size: number = Object.values(newFilters).reduce<number>(
      (previousValue, currentValue) => (currentValue ? previousValue + 1 : previousValue),
      0
    );
    setFilters(newFilters);
    setFiltersSize(size);
  }

  function clearAllFilters(): void {
    setFilters({ ...specialtyFilters });
    setFiltersSize(0);
  }

  function selectAllFilters(): void {
    const newFilters = Object.keys(specialtyFilters).reduce(
      (previousValue, currentValue) => ({ ...previousValue, [currentValue]: true }),
      specialtyFilters
    );
    setFilters(newFilters);
    setFiltersSize(Object.keys(newFilters).length);
  }

  return (
    <>
      <Head>
        <title>Catalog App: Construction companies</title>
      </Head>
      <ToolbarComponent
        q={q}
        onChange={setQ}
        count={filtersSize}
        filters={filters}
        toggleFilter={toggleFilter}
        clearFilters={clearAllFilters}
        selectAllFilters={selectAllFilters}
      />
      {error ? <div>Failed to load</div> : null}
      {!data ? <div>Loading...</div> : <CompaniesGrid data={data} />}
    </>
  );
}
