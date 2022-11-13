import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavContainer } from "./styled";

export const MainScreen = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <NavContainer>
        <Navbar.Brand href="#home">CryptoMonitor</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#wallet" >Wallet</Nav.Link>
          <Nav.Link href="#rules">Rules</Nav.Link>
        </Nav>
      </NavContainer>
    </Navbar>
  );
};

export default MainScreen;
