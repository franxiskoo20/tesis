import { Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import CreateRate from "../../features/rate/components/RateForm/CreateRate";
import RateTable from "../../features/rate/components/RateTable/RateTable";
// import useModalState from "../../hooks/useModalState";
const a11yProps = (index) => {
  return {
    id: `service-tab-${index}`,
    "aria-controls": `service-tabpanel-${index}`,
  };
};

const RatePage = () => {
  // const {
  //   isRegisterOpen,
  //   isEditOpen,
  //   isDeleteOpen,
  //   itemToAction,
  //   setItemToAction,
  //   toggleModal,
  // } = useModalState();

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
          <Tab label="Nueva Tarifas" {...a11yProps(0)} />
          <Tab label="Tarifas" {...a11yProps(1)} />
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
          <RateTable />
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default RatePage;
