import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryCliet = useQueryClient();

  const { mutate: checkout, isLoading: isCheckedout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully cheched out `);
      queryCliet.invalidateQueries({ active: true });
    },
    onError: () => toast.error(" there was an error while cheching out"),
  });

  return { checkout, isCheckedout };
}

export default useCheckout;
