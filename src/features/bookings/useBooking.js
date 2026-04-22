import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {getBooking} from "/src/services/apiBookings";

function useBooking() {
  const { bookingId } = useParams();

  const { isLoading, data: booking } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
  });

  return { isLoading, booking };
}

export default useBooking;
