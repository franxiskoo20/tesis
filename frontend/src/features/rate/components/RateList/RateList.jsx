import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Divider,
  Box,
} from "@mui/material";

const RateList = ({ rates }) => {
  return (
    <Paper sx={{ m: 1, p: 1 }} elevation={0}>
      {rates && rates.length > 0 ? (
        <List>
          {rates.map((rate, index) => (
            <ListItem key={index}>
              <ListItemText
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 1,
                }}
                primary={`Tarifa: ${rate.code}`}
                secondary={
                  <Box>
                    <Typography variant="body2" component="span">
                      Fecha de Incio: {rate.start_date}
                    </Typography>
                    <br />
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ mr: 1.9 }}
                    >
                      Fecha de Fin:
                    </Typography>
                    {rate.end_date}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="subtitle1" align="center">
          No existen Tarifas
        </Typography>
      )}
      <Divider />
    </Paper>
  );
};

export default RateList;
