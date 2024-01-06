import RateList from "../RateList/RateList";
import RateFormFields from "../RateInputs/RateFormFields";
import { Box } from "@mui/material";
import OverlayLoader from "../../../../components/common/Loading/OverlayLoader";

const RateVerify = ({ control, watch, verifiedRates, isVerifying }) => {
  return (
    <>
      <Box position="relative">
        <OverlayLoader isLoading={isVerifying} />
        <RateList rates={verifiedRates} isVerifying={isVerifying} />
      </Box>
      <RateFormFields
        control={control}
        watch={watch}
        verifiedRates={verifiedRates}
      />
    </>
  );
};

export default RateVerify;
