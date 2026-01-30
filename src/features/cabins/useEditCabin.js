import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEditCabins } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
  const createClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => CreateEditCabins({ newCabin, id }),
    onSuccess: () => {
      toast.success("cabin successfully edited");
      createClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
