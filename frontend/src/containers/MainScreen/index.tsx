import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MainContainer, NavContainer, SectionContainer } from "./styled";
import { SECTIONS } from "./constants";
import { useState } from "react";

export const MainScreen = () => {
  const [section, setSection] = useState(SECTIONS.rules);
  return (
    <MainContainer>
      <Navbar bg="dark" variant="dark">
        <NavContainer>
          <Navbar.Brand>CryptoMonitor</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              href="#wallet"
              onClick={() => setSection(SECTIONS.wallet)}
            >
              Wallet
            </Nav.Link>
            <Nav.Link href="#rules" onClick={() => setSection(SECTIONS.rules)}>
              Rules
            </Nav.Link>
          </Nav>
        </NavContainer>
      </Navbar>
      <SectionContainer>{section}</SectionContainer>
    </MainContainer>
  );
};

export default MainScreen;
