import toast from "react-hot-toast";
import { CreateEditCabins } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";




export default function useCreateCabin() {
    
  const createClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: (newCabin) => CreateEditCabins({ newCabin }),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      createClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
