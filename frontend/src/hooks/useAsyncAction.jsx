import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const useAsyncAction = (queryKey) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleAsyncAction = async () => {
    setIsSubmitting(true);
    await queryClient.invalidateQueries([queryKey]);
    setIsSubmitting(false);
  };

  return { isSubmitting, handleAsyncAction };
};

export default useAsyncAction;

// import { useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";

// const useAsyncAction = (toggleModal) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const queryClient = useQueryClient();

//   const handleAsyncAction = async (actionType, queryKey) => {
//     setIsSubmitting(true);
//     toggleModal(actionType);
//     await queryClient.invalidateQueries([queryKey]);
//     setIsSubmitting(false);
//   };

//   return { isSubmitting, handleAsyncAction };
// };

// export default useAsyncAction;
