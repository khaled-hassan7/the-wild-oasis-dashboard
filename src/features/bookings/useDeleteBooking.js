import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBookingMutation } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
  return { isDeleting, deleteBookingMutation };
}

export default useDeleteBooking;
