import RateFormFieldsVerify from "../RateInputs/RateFormFieldsVerify";

const RateForm = ({
  control,
  watch,
  setValue,
  customers,
  serviceType,
  products,
  routes,
}) => {
  return (
    <RateFormFieldsVerify
      control={control}
      watch={watch}
      setValue={setValue}
      customers={customers}
      serviceType={serviceType}
      products={products}
      routes={routes}
    />
  );
};

export default RateForm;
