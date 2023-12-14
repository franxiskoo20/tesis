import RateFormFields from "../RateInputs/RateFormFields";

const CreateRate = ({
  control,
  watch,
  setValue,
  customers,
  serviceType,
  products,
}) => {
  return (
    <RateFormFields
      control={control}
      watch={watch}
      setValue={setValue}
      customers={customers}
      serviceType={serviceType}
      products={products}
    />
  );
};

export default CreateRate;
