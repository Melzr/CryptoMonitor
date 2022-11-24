import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  MainContainer,
  NavContainer,
  SectionContainer,
  LogoutButton,
  NavLinksContainer,
} from "./styled";
import { SECTIONS } from "./constants";
import { useState } from "react";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { logout } from "../../state/actions/authAction";
import { useAppDispatch } from "../../state";
import { GenericButton } from "../../components/Button";

export const MainScreen = () => {
  const dispatch = useAppDispatch();
  const [section, setSection] = useState(SECTIONS.rules);
  const [showConfirm, setShowConfirm] = useState(false);
  return (
    <MainContainer>
      <ConfirmationModal
        title={"Logout"}
        text={"Are you sure you want to logout?"}
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={() => dispatch(logout())}
      />
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>CryptoMonitor</Navbar.Brand>
        <NavContainer>
          <NavLinksContainer>
            <Nav className="me-auto">
              <Nav.Link href="" onClick={() => setSection(SECTIONS.wallet)}>
                Wallet
              </Nav.Link>
              <Nav.Link href="" onClick={() => setSection(SECTIONS.rules)}>
                Rules
              </Nav.Link>
              <Nav.Link href="" onClick={() => setSection(SECTIONS.variables)}>
                Variables
              </Nav.Link>
            </Nav>
          </NavLinksContainer>
          <LogoutButton>
            <GenericButton
              onClick={() => setShowConfirm(true)}
              text={"Logout"}
            />
          </LogoutButton>
        </NavContainer>
      </Navbar>
      <SectionContainer>{section}</SectionContainer>
    </MainContainer>
  );
};

export default MainScreen;
