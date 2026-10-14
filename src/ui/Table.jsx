import { createContext, useContext } from "react";
import styled, { css } from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

  /* On small screens, wide rows scroll horizontally instead of being crushed */
  @media (max-width: 64em) {
    overflow-x: auto;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;

  /* Preserve desktop-like column proportions while scrolling horizontally */
  @media (max-width: 64em) {
    min-width: 64rem;
  }
`;

/* NEW: وضع الكروت، بيتحدد من الـ object اللي الجدول بيمرره */
const mobileCss = (m) => css`
  @media (max-width: 48em) {
    min-width: 0;
    grid-template-columns: ${m.columns};
    grid-template-areas: ${m.areas};
    column-gap: 1.2rem;
    row-gap: 0.4rem;
    padding: 1.2rem 1.6rem;

    & > * {
      min-width: 0;
    }

    ${m.cells
      .map((name, i) => {
        const end = ["status", "amount", "discount", "menu"].includes(name);
        return `& > :nth-child(${i + 1}) {
          grid-area: ${name};
          ${end ? "justify-self: end;" : ""}
          ${name === "menu" ? "align-self: center;" : ""}
        }`;
      })
      .join("\n")}
  }
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);

  /* NEW: الهيدر بيختفي بس في وضع الكروت */
  ${(p) =>
    p.$mobile &&
    css`
      @media (max-width: 48em) {
        display: none;
      }
    `}
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  /* NEW */
  ${(p) => p.$mobile && mobileCss(p.$mobile)}
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* Keep pagination fully visible while the table scrolls horizontally */
  @media (max-width: 64em) {
    position: sticky;
    left: 0;
  }

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
const TableContext = createContext();

function Table({ children, columns, mobile }) { // NEW: mobile
  return (
    <TableContext.Provider value={{ columns, mobile }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns, mobile } = useContext(TableContext);

  return (
    <StyledHeader role="row" columns={columns} $mobile={mobile}>
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns, mobile } = useContext(TableContext);

  return (
    <StyledRow role="row" columns={columns} $mobile={mobile}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  if (!data.length) return <Empty> no data to show at this moment </Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;