import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: editCurrentUser,
    onSuccess: (user) => {
      toast.success("account user successfully edited");
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], user.user);
      console.log(user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isLoading };
}

export default useUpdateUser;
