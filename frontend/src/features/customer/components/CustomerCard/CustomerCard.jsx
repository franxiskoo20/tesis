import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { blue } from "@mui/material/colors";

const CustomerCard = ({ customers }) => {
  const baseUrl = "http://localhost:8000/storage/";
  return (
    <>
      {customers?.map((customer) => (
        <Grid xs={12} sm={6} md={4} key={customer.id}>
          <Card elevation={2}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
                  {customer.user.name[0]}
                </Avatar>
              }
              title={customer.user.name}
              subheader={customer.user.email}
              sx={{ bgcolor: blue[300], color: "primary.contrastText" }}
            />

            {customer.logo && (
              <CardMedia
                component="img"
                height="140"
                image={`${baseUrl}${customer.logo}`}
                alt={customer.name}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {customer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {customer.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default CustomerCard;
