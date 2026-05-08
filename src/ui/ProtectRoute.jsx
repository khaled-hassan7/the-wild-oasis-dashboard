import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StyleSpinner = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectRoute({ children }) {
  const { isAuthenticated, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login", { replace: true });
      }
    },
    [isAuthenticated, isLoading, navigate],
  );

  if (isLoading)
    return (
      <StyleSpinner>
        <Spinner />
      </StyleSpinner>
    );
  if (isAuthenticated) return children;
}

export default ProtectRoute;
