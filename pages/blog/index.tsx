import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Catalog.module.css';

import { BlogPost } from '../../data';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((res) => res.json() as Promise<T>);

export default function BlogPage() {
  const { data, error } = useSWR<BlogPost[], unknown>(`https://jsonplaceholder.typicode.com/posts`, fetcher);

  return (
    <>
      <Head>
        <title>Blog post</title>
      </Head>
      <Box className={styles.toolbox}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Home</Link>
          <Typography color="text.primary">Blog</Typography>
        </Breadcrumbs>
      </Box>
      {error ? <div>Failed to load</div> : null}
      {!data ? (
        <div>Loading...</div>
      ) : (
        <ul className={styles.list}>
          {data.map((post) => (
            <li key={`post_${post.id}`} className={styles.listItem}>
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
