import { useState } from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import { useAppDispatch } from "../../state";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import {
  LoginContainer,
  MainContainer,
  LoginButtonContainer,
  GoogleImage,
  GoogleButtonContainer,
  ButtonsContainer,
} from "./styled";
import { login, googleLogin, createAccount } from "../../state/actions/authAction";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const Login = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({ email: "", password: "" });

  const loginUser = async () => {
    if (loading) return;
    setError("");
    setLoading(true);
    if (!info.email || !info.password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      await dispatch(login(info.email, info.password));
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  };

  const registerUser = async () => {
    if (loading) return;
    setError("");
    setLoading(true);
    if (!info.email || !info.password) {
      setError("Please fill all the fields");
      return;
    }
    try {
      await dispatch(createAccount(info.email, info.password));
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  }

  const googleUserLogin = async (credentialResponse: CredentialResponse) => {
    if (loading) return;
    const googleToken = credentialResponse.credential;
    setError("");
    setLoading(true);
    try {
      if (googleToken) {
        await dispatch(googleLogin(googleToken));
      } else {
        setError("Unexpected error. Try again later.");
      }
    } catch (error) {
      setError(error as string);
    }
    setLoading(false);
  };

  return (
    <MainContainer>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">CryptoMonitor</Navbar.Brand>
      </Navbar>
      <LoadingSpinner loading={loading} />
      <LoginContainer>
        <Form className="login">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={info.password}
              onChange={(e) => setInfo({ ...info, password: e.target.value })}
            />
          </Form.Group>
          <Form.Text className="text-danger">{error}</Form.Text>
          <ButtonsContainer>
            <LoginButtonContainer>
              <Button
                className="login-button"
                variant="dark"
                type="submit"
                disabled={loading}
                onClick={registerUser}
              >
                Sign up
              </Button>
              <Button
                className="login-button"
                variant="dark"
                type="submit"
                onClick={loginUser}
                disabled={loading}
              >
                Sign in
              </Button>
            </LoginButtonContainer>
            <GoogleButtonContainer>
              <GoogleLogin theme="outline" onSuccess={googleUserLogin} />
            </GoogleButtonContainer>
          </ButtonsContainer>
        </Form>
      </LoginContainer>
    </MainContainer>
  );
};
