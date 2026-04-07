import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCbin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";


const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, image, name, regularPrice, discount, maxCapacity } = cabin;
  const { isLoading, mutate } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  function handelDoublicat() {
    createCabin({
      image,
      name: `copy of ${name}`,
      regularPrice,
      discount,
      maxCapacity,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up tp {maxCapacity}</div>
        <Price> {formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id}></Menus.Toggle>

              <Menus.List id={id}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handelDoublicat}
                >
                  doublicat
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="edit">
                <CreateCabinForm editCabinData={cabin} />
              </Modal.Window>

              <Modal.Window name="delete">
                <ConfirmDelete
                  onConfirm={() => {
                    mutate(id);
                  }}
                  disabled={isLoading}
                  resourceName="cabins"
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
