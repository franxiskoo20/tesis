import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import OrderTrunk from "../../features/order/components/OrderTable/OrderTrunk";
import useOrder from "../../features/order/hooks/useOrder";
import useAsyncAction from "../../hooks/useAsyncAction";

const OrderPage = () => {
  const { orders, isLoading } = useOrder();

  const { isSubmitting, handleAsyncAction } = useAsyncAction(orders);

  return (
    <AuthenticatedLayout>
      <PaperContainer relativePosition={true}>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <OrderTrunk
            orders={orders}
            // onEdit={(rate) => {
            //   setItemToAction(rate);
            //   toggleModal("edit");
            // }}
            isSubmitting={isSubmitting}
          />
        )}
      </PaperContainer>
    </AuthenticatedLayout>
  );
};

export default OrderPage;
