import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Company } from '../data';
import styles from '../styles/Catalog.module.css';

export default function CompanyCard({ id, name, logo, specialties, city, description }: Company) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={logo} alt={name} />
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            ID: {id}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2">
            {specialties.map((sp) => (
              <span className={styles.tag} key={`tag_${id}_${sp}`}>
                {sp}
              </span>
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
