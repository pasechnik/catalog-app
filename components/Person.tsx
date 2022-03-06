import Link from 'next/link';
import { Person } from '../data';

type PersonComponentProps = {
  person: Person;
};

export default function PersonComponent({ person }: PersonComponentProps): JSX.Element {
  return (
    <li>
      <Link href="/person/[id]" as={`/person/${person.id}`}>
        <a>{person.name}</a>
      </Link>
    </li>
  );
}
