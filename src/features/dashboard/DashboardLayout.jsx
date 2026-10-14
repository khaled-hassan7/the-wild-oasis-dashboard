import styled from "styled-components";
import useResentBookings from "./useResentBookings";
import Spinner from "../../ui/Spinner";
import useResentStays from "./useResentStays";
import Stats from "./stats";
import useCabins from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;

  /* Tablet: two columns — stat cards pair up, charts go full width */
  @media (max-width: 64em) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, auto) 34rem repeat(2, auto);
  }

  /* Mobile: single column */
  @media (max-width: 48em) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto) 34rem repeat(2, auto);
  }
`;

function DashboardLayout() {
  const { isLoading, bookings, numDays } = useResentBookings();
  const { isLoading: isLoading1, stays, confirmedStayed } = useResentStays();
  const { isLoading: isLoading2, cabins } = useCabins();

  if (isLoading || isLoading1 || isLoading2) return <Spinner />;

  console.log(stays);

  return (
    <StyledDashboardLayout>
      <Stats
        confirmedStayed={confirmedStayed}
        bookings={bookings}
        stays={stays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStayed={confirmedStayed} />

      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
