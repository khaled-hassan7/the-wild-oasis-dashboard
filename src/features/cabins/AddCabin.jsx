import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="create-cabin">
        <Button>add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="create-cabin">
        <CreateCabinForm />
      </Modal.Window>

            <Modal.Open opens="table">
        <Button>add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window>

    </Modal>
  );
}

export default AddCabin;
