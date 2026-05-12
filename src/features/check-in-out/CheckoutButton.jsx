import Button from "../../ui/Button";
import useCheckout from "../check-in-out/useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckedout } = useCheckout();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckedout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
