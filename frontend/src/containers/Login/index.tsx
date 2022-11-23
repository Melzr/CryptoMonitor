import { Container, NavLink } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import GOOGLE_LOGO from "../../images/google-icon.png";
import { GoogleLogin } from '@react-oauth/google';
import { googleLogout } from '@react-oauth/google';
import { LoginContainer, MainContainer, LoginButtonContainer, GoogleImage, GoogleButtonContainer, ButtonsContainer } from "./styled";

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
          <ButtonsContainer>
            <LoginButtonContainer>
              <Button className="login-button" variant="dark" type="submit">
                Sign up
              </Button>
              <Button className="login-button" variant="dark" type="submit">
                Sign in
              </Button>
            </LoginButtonContainer>
            <GoogleButtonContainer>
              {/* <Button
                className="google-login-button"
                variant="dark"
                type="submit"
                onClick={() => googleLogin()}
              >
                <GoogleImage src={GOOGLE_LOGO} alt="google-logo" />
                Log in with Google
              </Button> */}
              <GoogleLogin
                theme="outline"
                onSuccess={credentialResponse => {
                  const googleToken = credentialResponse.credential;
                  console.log(googleToken);
                }}
              />
            </GoogleButtonContainer>
          </ButtonsContainer>
        </Form>
        </LoginContainer>
    </MainContainer>
  );
};
