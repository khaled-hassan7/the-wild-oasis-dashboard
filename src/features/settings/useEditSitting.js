import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useEditSitting() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editSitting } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("sitting successfuly edited");
      queryClient.invalidateQueries({ queryKey: ["sittings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editSitting };
}

export default useEditSitting;
