import useSWR from 'swr';
import Head from 'next/head';
import { Company } from '../../data';
import throttle from 'lodash/throttle';
import { useEffect, useState } from 'react';
import ToolbarComponent from '../../components/Toolbar';
import CompaniesGrid from '../../components/CompaniesGrid';

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((res) => res.json() as Promise<T>);

export default function CompaniesPage() {
  const [q, setQ] = useState('');
  const [param, setParam] = useState('');
  const { data, error } = useSWR<Company[], unknown>(
    q.length ? `/api/companies?q=${param}` : `/api/companies`,
    fetcher
  );

  const setParamDeb = throttle((q) => {
    setParam(q);
  }, 1000);

  useEffect(() => {
    setParamDeb(q);
  }, [q, setParamDeb]);

  return (
    <>
      <Head>
        <title>Catalog App: Construction companies</title>
      </Head>
      <ToolbarComponent q={q} onChange={setQ} />
      {error ? <div>Failed to load</div> : null}
      {!data ? <div>Loading...</div> : <CompaniesGrid data={data} />}
    </>
  );
}
