import useSWR from 'swr';
import Person from '../components/Person';
import { Person as PersonType } from '../data/people';

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((res) => res.json() as Promise<T>);

export default function Index() {
  const { data, error } = useSWR<PersonType[], unknown>('/api/people', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <ul>
      {data.map((p, i) => (
        <Person key={i} person={p} />
      ))}
    </ul>
  );
}
