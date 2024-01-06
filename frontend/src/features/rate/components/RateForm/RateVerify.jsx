import RateList from "../RateList/RateList";
import RateFormFields from "../RateInputs/RateFormFields";

const RateVerify = ({ control, watch, verifiedRates }) => {
  return (
    <>
      <RateList rates={verifiedRates} />
      <RateFormFields control={control} watch={watch} />
    </>
  );
};

export default RateVerify;
