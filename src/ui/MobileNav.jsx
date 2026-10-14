import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";

/*
  Fixed bottom navigation bar, shown only on mobile screens (<= 48em),
  where the sidebar is hidden. Mirrors the sidebar's 5 main sections.
*/
const StyledMobileNav = styled.nav`
  display: none;

  @media (max-width: 48em) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;

    display: flex;
    align-items: stretch;

    background-color: var(--color-grey-0);
    border-top: 1px solid var(--color-grey-100);
    box-shadow: var(--shadow-md);

    /* Keep items clear of the iOS home indicator */
    padding: 0.4rem 0.8rem calc(0.4rem + env(safe-area-inset-bottom));
  }
`;

const NavList = styled.ul`
  display: flex;
  flex: 1;
`;

const NavItem = styled.li`
  flex: 1 1 0;
  display: flex;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    min-height: 6.4rem;
    padding: 0.8rem 0.4rem;

    color: var(--color-grey-600);
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    transition: all 0.3s;
  }

  &:hover,
  &:active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-md);
  }

  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-md);
    font-weight: 600;
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MobileNav() {
  return (
    <StyledMobileNav>
      <NavList>
        <NavItem>
          <StyledNavLink to="dashboard">
            <HiOutlineCalendarDays />
            <span>Home</span>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="bookings">
            <HiOutlineHome />
            <span>Booking</span>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </NavItem>
        <NavItem>
          <StyledNavLink to="sitting">
            <HiOutlineCog6Tooth />
            <span>Sitting</span>
          </StyledNavLink>
        </NavItem>
      </NavList>
    </StyledMobileNav>
  );
}

export default MobileNav;
