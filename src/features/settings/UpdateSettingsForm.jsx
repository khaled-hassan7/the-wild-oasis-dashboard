import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSitting } from "./useSitting";
import Spinner from "../../ui/Spinner";
import useEditSitting from "./useEditSitting";

function UpdateSettingsForm() {
  const { isEditing, editSitting } = useEditSitting();
  const {
    isLoading,
    sitting: {
      minBookingLength,
      maxBookingLength,
      maxGuestPerBooking,
      breakfastPrice,
    } = {},
  } = useSitting();

  function handelEdit(e, field) {
    const { value } = e.target;
    editSitting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          onBlur={(e) => handelEdit(e, "minBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          onBlur={(e) => handelEdit(e, "maxBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestPerBooking}
          onBlur={(e) => handelEdit(e, "maxGuestPerBooking")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handelEdit(e, "breakfastPrice")}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
