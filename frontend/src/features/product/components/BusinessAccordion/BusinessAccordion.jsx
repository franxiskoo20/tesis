import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/system";
import useBusinessType from "../../hooks/useBusinessType";
import { BUSINESS_COLORS } from "../../constants/productBusiness";

const BusinessAccordion = () => {
  const { businessType } = useBusinessType();

  return (
    <>
      <Typography variant="subtitle1" gutterBottom mb={2}>
        En nuestro análisis, clasificamos los productos según su pertenencia a
        distintos sectores industriales, cada uno con características y
        requerimientos específicos. Esta clasificación no solo facilita la
        comprensión de las dinámicas de mercado, sino que también ayuda a
        identificar estrategias de gestión y comercialización adecuadas para
        cada tipo de producto. Los tipos de negocios que consideramos son:
      </Typography>
      {businessType?.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${item.id}a-content`}
            id={`panel${item.id}a-header`}
            sx={{
              backgroundColor: BUSINESS_COLORS
                ? alpha(BUSINESS_COLORS[item.id], 0.1)
                : "default",
            }}
          >
            <Typography
              component={"div"}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: BUSINESS_COLORS ? BUSINESS_COLORS[item.id] : "default",
              }}
            >
              {item.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: BUSINESS_COLORS
                ? alpha(BUSINESS_COLORS[item.id], 0.8)
                : "default",
              color: "white",
            }}
          >
            <Typography>{item.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default BusinessAccordion;
