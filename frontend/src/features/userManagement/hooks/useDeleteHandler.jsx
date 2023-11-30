import { useState } from "react";
import useDeleteUser from "./useDeleteUser";

const useDeleteHandler = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const deleteMutation = useDeleteUser();

  const handleDelete = (userId) => {
    setSelectedUserId(userId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(selectedUserId);
    setDeleteConfirmOpen(false);
  };

  return {
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    handleDelete,
    confirmDelete,
  };
};

export default useDeleteHandler;