import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOpertaion() {
  return (
    <TableOperations>
      <Filter
        options={[
          { value: "all", label: "all" },
          { value: "no-discount", label: "no discount" },
          { value: "with-discount", label: "with discount" },
        ]}
        filterField="discount"
      />
      <SortBy
        options={[
          { value: "name-asc", label: "sort by name (A-Z)" },
          { value: "name-desc", label: "sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "sort by price (low first)" },
          { value: "regularPrice-desc", label: "sort by price (high first)" },
          {
            value: "maxCapacity-asc",
            label: "sort by max capacity (low first)",
          },
          {
            value: "maxCapacity-dsec",
            label: "sort by max capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOpertaion;
