import { Divider, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PaperContainer from "../../components/common/Container/PaperContainer";
import CustomTabPanel from "../../components/common/Navigation/CustomTabPanel";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import CreateRate from "../../features/rate/components/RateForm/CreateRate";
import RateTableCurrent from "../../features/rate/components/RateTable/RateTableCurrent";
import RateTableIdle from "../../features/rate/components/RateTable/RateTableIdle";

import useModalState from "../../hooks/useModalState";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import useRate from "../../features/rate/hooks/useRate";
import useAsyncAction from "../../hooks/useAsyncAction";
import RateDeleteModal from "../../features/rate/components/RateModal/RateDeleteModal";
import RateEditModal from "../../features/rate/components/RateModal/RateEditModal";

const a11yProps = (index) => {
  return {
    id: `service-tab-${index}`,
    "aria-controls": `service-tabpanel-${index}`,
  };
};

const RatePage = () => {
  const { rates, isLoading } = useRate();
  const {
    isEditOpen,
    isDeleteOpen,
    itemToAction,
    setItemToAction,
    toggleModal,
  } = useModalState();

  const { isSubmitting, handleAsyncAction } = useAsyncAction(rates);

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <AuthenticatedLayout>
      <PaperContainer relativePosition={true}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="service tabs"
        >
          <Tab label="Nueva Tarifas" {...a11yProps(0)} />
          <Tab label="Tarifas Vigente" {...a11yProps(1)} />
          <Tab label="Tarifas Inactivas" {...a11yProps(1)} />
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
          <CreateRate onAdded={() => handleAsyncAction()} />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <RateTableCurrent
              rates={rates}
              onEdit={(rate) => {
                setItemToAction(rate);
                toggleModal("edit");
              }}
              onDelete={(rate) => {
                setItemToAction(rate);
                toggleModal("delete");
              }}
              isSubmitting={isSubmitting}
            />
          )}
          {itemToAction && (
            <>
              <RateEditModal
                open={isEditOpen}
                onClose={() => {
                  toggleModal("edit");
                  setItemToAction(null);
                }}
                toEdit={itemToAction}
                onEdit={() => handleAsyncAction()}
              />
              <RateDeleteModal
                open={isDeleteOpen}
                onClose={() => {
                  toggleModal("delete");
                  setItemToAction(null);
                }}
                toDelete={itemToAction}
                onDelete={() => handleAsyncAction()}
              />
            </>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <RateTableIdle rates={rates} isSubmitting={isSubmitting} />
          )}
        </CustomTabPanel>
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default RatePage;
