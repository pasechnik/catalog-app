import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import { BlogPost } from '../../data';
import { useRouter } from 'next/router';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styles from '../../styles/Catalog.module.css';

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((res) => res.json() as Promise<T>);

export default function BlogPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const { data, error } = useSWR<BlogPost, unknown>(`https://jsonplaceholder.typicode.com/posts/${id}`, fetcher);

  return (
    <>
      <Head>
        <title>Blog post</title>
      </Head>
      <Box className={styles.toolbox}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/blog/">Blog</Link>
          <Typography color="text.primary">{data ? data.title : '...'}</Typography>
        </Breadcrumbs>
      </Box>
      {error ? <div>Failed to load</div> : null}
      {!data ? (
        <div>Loading...</div>
      ) : (
        <table>
          <tr>
            <th>id</th>
            <td>{data.id}</td>
          </tr>
          <tr>
            <th>User</th>
            <td>{data.userId}</td>
          </tr>
          <tr>
            <th>Title</th>
            <td>{data.title}</td>
          </tr>
          <tr>
            <th>Body</th>
            <td>{data.body}</td>
          </tr>
        </table>
      )}
    </>
  );
}
