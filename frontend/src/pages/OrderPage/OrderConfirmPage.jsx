import PaperContainer from "../../components/common/Container/PaperContainer";
import LoadingSkeleton from "../../components/common/Loading/LoadingSkeleton";
import AuthenticatedLayout from "../../components/layout/AuthenticatedLayout";
import OrderConfirm from "../../features/order/components/OrderTable/OrderConfirm";
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
          <OrderConfirm
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
