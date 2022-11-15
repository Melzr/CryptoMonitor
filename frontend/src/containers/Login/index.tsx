import { Container, NavLink } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LoginContainer, MainContainer } from "./styled";

export const Login = () => {
  return (
    <MainContainer>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">CryptoMonitor</Navbar.Brand>
       </Navbar>
      <LoginContainer>
        <Form className="login">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
            <Button className="login-button" variant="dark" type="submit">
            Submit
          </Button>
        </Form>
        <NavLink className="back">Go back to main screen</NavLink>
        </LoginContainer>
    </MainContainer>
  );
};
