import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from './useSnackbar';

const useGenericMutation = ({ mutationFn, successMessage, errorMessage, onSuccessCallback }) => {
  const { showSnackbar } = useSnackbar();

  return useMutation({
    mutationFn,
    onError: (error) => {
      showSnackbar(error?.errors || errorMessage, 'error');
    },
    onSuccess: (data) => {
      showSnackbar(data?.message || successMessage, 'success');
      onSuccessCallback?.();
    },
  });
};

export default useGenericMutation;
