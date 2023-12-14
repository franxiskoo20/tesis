import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/system";
import UserAvatar from "../UserAvatar/UserAvatar";

const UserAccordion = ({ items, colorMap }) => {
  return (
    <>
      {items?.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${item.id}a-content`}
            id={`panel${item.id}a-header`}
          >
            <Typography
              component={"div"}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: colorMap ? colorMap[item.id] : "default",
              }}
            >
              <UserAvatar name={item.name} roleId={item.id} />
              {item.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: colorMap
                ? alpha(colorMap[item.id], 0.1)
                : "default",
            }}
          >
            <Typography>{item.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default UserAccordion;
