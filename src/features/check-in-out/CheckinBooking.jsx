import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useCheckin from "./useCheckin";
import { formatCurrency } from "../../utils/helpers";
import { useSitting } from "../settings/useSitting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakFast] = useState(false);

  const { isLoading, booking } = useBooking();
  const { checkin, isCheckedin } = useCheckin();
  const { sitting, isLoading: isLoadingBreakFast } = useSitting();

  useEffect(() => {
    setConfirmedPaid(booking?.isPaid ?? false);
  }, [booking]);

  const moveBack = useMoveBack();

  if (isLoading || isLoadingBreakFast) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakFastPrice = sitting.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confirmedPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakFast: {
          extrasPrice: optionalBreakFastPrice,
          hasBreakfast: true,
          totalPrice: totalPrice + optionalBreakFastPrice,
        },
      });
    } else {
      checkin({
        bookingId,
        breakFast: {},
      });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="add"
            onChange={() => {
              setAddBreakFast((add) => !add);
              setConfirmedPaid(false);
            }}
          >
            {`want to breakfast for  ${formatCurrency(optionalBreakFastPrice)} `}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          disabled={confirmedPaid || isCheckedin}
          checked={confirmedPaid}
          id="confirmed"
          onChange={() => setConfirmedPaid((confirm) => !confirm)}
        >
          i confirm that {guests.fullName} has paid the total price{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakFastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakFastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          disabled={!confirmedPaid || isCheckedin}
          onClick={handleCheckin}
        >
          Check in booking #{bookingId}
        </Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
