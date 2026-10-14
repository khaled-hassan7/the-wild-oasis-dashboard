import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import styled from "styled-components";

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;

  @media (max-width: 48em) {
    /* Extra bottom padding so the fixed MobileNav bar never covers content */
    padding: 2.4rem 1.6rem calc(10rem + env(safe-area-inset-bottom));
  }
`;

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;
  height: 100vh;

  @media (max-width: 48em) {
    /* Sidebar is hidden on mobile; content takes the full width */
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
      <MobileNav />
    </StyledAppLayout>
  );
}

export default AppLayout;
