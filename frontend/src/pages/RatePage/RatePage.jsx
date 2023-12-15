import { Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import CreateRate from "../../features/rate/components/RateForm/CreateRate";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
const a11yProps = (index) => {
  return {
    id: `service-tab-${index}`,
    "aria-controls": `service-tabpanel-${index}`,
  };
};

const RatePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AuthenticatedLayout>
      <PaperContainer title="Lista de Tarifas" relativePosition={true}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="service tabs"
        >
          <Tab label="Tarifas" {...a11yProps(0)} />
          <Tab label="Tipo de Tarifas" {...a11yProps(1)} />
        </Tabs>
        <Divider />
        <CustomTabPanel
          value={tabValue}
          index={0}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CreateRate />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <h1>PRUEBA</h1>
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default RatePage;
