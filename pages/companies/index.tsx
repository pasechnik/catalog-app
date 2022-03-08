import useSWR from 'swr';
import Head from 'next/head';
import { Company } from '../../data';
import CompanyCard from '../../components/CompanyCard';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import styles from '../../styles/Catalog.module.css';

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((res) => res.json() as Promise<T>);

export default function CompaniesIndex() {
  const { data, error } = useSWR<Company[], unknown>('/api/companies', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>Catalog App: Construction companies</title>
      </Head>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <Link href="/" passHref>
              <MenuIcon />
            </Link>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Construction companies
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={styles.container}>
        <Grid container spacing={2}>
          {data.map(({ id, name, logo, city, specialties, description }) => (
            <Grid key={`CompanyCard_${id}`} item xs={4}>
              <CompanyCard
                id={id}
                name={name}
                logo={logo}
                city={city}
                description={description}
                specialties={specialties}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
}
