import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { grey } from "@mui/material/colors";
import { useState } from "react";
import UserAvatar from "../../../user/components/UserAvatar/UserAvatar";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomerCard = ({ customers }) => {
  const baseUrl = "http://localhost:8000/storage/";

  const [expanded, setExpanded] = useState({});

  const handleExpandClick = (customerId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [customerId]: !prevExpanded[customerId],
    }));
  };

  return (
    <>
      {customers?.map((customer) => (
        <Grid xs={12} sm={6} md={4} key={customer.id}>
          <Card>
            <CardHeader
              avatar={
                <UserAvatar
                  role={customer.user.roleId}
                  name={customer.user.name}
                />
              }
              title={customer.user.name}
              subheader={
                <Box sx={{ color: grey[400] }}>
                  {customer.user.email}
                  <br />
                  {customer.createdAt}
                </Box>
              }
              sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
            />

            {customer.logo && (
              <CardMedia
                component="img"
                height="160"
                image={`${baseUrl}${customer.logo}`}
                alt={customer.name}
                sx={{ objectFit: "contain", objectPosition: "center" }}
              />
            )}
            <CardActionArea>
              <CardContent sx={{ display: "flex" }}>
                <Typography gutterBottom variant="h6" component="div">
                  {customer.name}
                </Typography>
                <ExpandMore
                  expand={expanded[customer.id] || false}
                  onClick={() => handleExpandClick(customer.id)}
                  aria-expanded={expanded[customer.id] || false}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardContent>
              <Collapse
                in={expanded[customer.id] || false}
                timeout="auto"
                unmountOnExit
              >
                <CardContent>
                  <Typography variant="body2">
                    {customer.description}
                  </Typography>
                </CardContent>
              </Collapse>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default CustomerCard;
