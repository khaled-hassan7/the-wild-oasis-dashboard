import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";
const StyleSideBar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  grid-row: 1/-1;
`;
function Sidebar() {
  return (
    <StyleSideBar>
      <Logo />
      <MainNav />
    </StyleSideBar>
  );
}

export default Sidebar;
