import Grid from '@mui/material/Grid';
import { Company } from '../data';
import CompanyCard from '../components/CompanyCard';
import styles from '../styles/Catalog.module.css';

type CompaniesGridProps = {
  data: Company[];
};

export default function CompaniesGrid({ data }: CompaniesGridProps) {
  return (
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
  );
}
