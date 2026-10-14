import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }

  /* Reflow to two rows on mobile so nothing gets clipped */
  @media (max-width: 48em) {
    grid-template-columns: minmax(0, 9rem) 2rem minmax(0, 1fr);
    grid-template-areas:
      "tag flag guest"
      "nights . button";
    gap: 0.4rem 1.2rem;

    & > *:nth-child(1) {
      grid-area: tag;
    }
    & > *:nth-child(2) {
      grid-area: flag;
    }
    & > *:nth-child(3) {
      grid-area: guest;
    }
    & > *:nth-child(4) {
      grid-area: nights;
    }
    & > *:nth-child(5) {
      grid-area: button;
      justify-self: end;
    }
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, numNights, guests } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`flag of ${guests.country} `} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === "unconfirmed" && (
        <Button type="primary" size="small" as={Link} to={`/checkin/${id}`}>
          check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
