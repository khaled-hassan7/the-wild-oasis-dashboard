import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOpertaion from "../features/cabins/CabinTableOpertaion";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOpertaion />
      </Row>
      <CabinTable />
      <AddCabin />
    </>
  );
}

export default Cabins;
