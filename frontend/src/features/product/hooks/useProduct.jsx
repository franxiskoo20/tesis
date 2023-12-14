import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/productService";
import { adaptProductData } from "../adapters/adaptProductData";

const useProduct = () => {
  const {
    data: products,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["products"],
    queryFn: productService.getProducts,
    select: (data) => data.map(adaptProductData),
  });

  return { products, isSuccess,isLoading};
};

export default useProduct;
