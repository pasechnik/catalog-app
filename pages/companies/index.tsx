import useSWR from 'swr';
import Head from 'next/head';
import { alpha, styled } from '@mui/material/styles';
import { Company } from '../../data';
import CompanyCard from '../../components/CompanyCard';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import styles from '../../styles/Catalog.module.css';
import { ChangeEvent, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const fetcher = <T,>(url: string): Promise<T> => fetch(url).then((res) => res.json() as Promise<T>);

export default function CompaniesIndex() {
  const [q, setQ] = useState('');
  const { data, error } = useSWR<Company[], unknown>(q.length ? `/api/companies?q=${q}` : `/api/companies`, fetcher);

  function onChange(event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): void {
    setQ(event.target.value);
  }

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>Catalog App: Construction companies</title>
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              CONSTRUCTION
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                value={q}
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
              />
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
      <div className={styles.container}>
        <Grid container spacing={2}>
          {data
            .filter((_) => (q.length ? _.name.search(new RegExp(q, 'i')) !== -1 : true))
            .map(({ id, name, logo, city, specialties, description }) => (
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
    </>
  );
}
