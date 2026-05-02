import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryCliet = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckedin } = useMutation({
    mutationFn: ({ bookingId, breakFast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakFast,
      }),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully cheched in `);
      queryCliet.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error(" there was an error while cheching in"),
  });

  return { checkin, isCheckedin };
}

export default useCheckin;
