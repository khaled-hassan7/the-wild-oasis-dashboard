import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCbin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const [isEdit, setIsEdit] = useState(false);
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
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up tp {maxCapacity}</div>
        <Price> {formatCurrency(regularPrice)}</Price>
        <Discount>{formatCurrency(discount)}</Discount>
        <div>
          <button disabled={isCreating} onClick={handelDoublicat}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setIsEdit(!isEdit)}>
            <HiPencil />
          </button>
          <button
            onClick={() => {
              mutate(id);
            }}
            disabled={isLoading}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {isEdit && <CreateCabinForm editCabinData={cabin} />}
    </>
  );
}

export default CabinRow;
