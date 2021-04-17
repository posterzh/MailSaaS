/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Spinner,
  UncontrolledAlert,
} from "reactstrap";
import { Link } from "react-router-dom";
import AuthHeader from "../../../components/Headers/AuthHeader.js";
import { login, googleLogin } from "../../../redux/action/AuthAction";
import { connect } from "react-redux";
import { history } from "../../../index";

import axios from "../../../utils/axios";

import GoogleLogin from "react-google-login";
import {
  DJANGO_OAUTH_CLIENT_ID,
  DJANGO_OAUTH_CLIENT_SECRET
} from "../../../utils/Common";

class Login extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);
    const email = params.get("email");
    const invitation_id = params.get("invitation_id");
    console.log("invitation id: ", invitation_id);

    this.state = {
      email: email || "",
      password: "",
      focusedEmail: false,
      focusedPassword: false,
      loading: false,
      error: false,
      invitation_id: invitation_id,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    // this.props.login(user);

    this.setState({ loading: true, error: false });
    axios
      .post("/rest-auth/login/", user)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("access_token", token);

        this.props.login(response.data.user);

        history.push("/app/admin/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onGoogleAuthSuccess = (response) => {
    const { email, name, givenName, familyName } = response.profileObj;
    const user = {
      username: name,
      email: email,
      first_name: givenName,
      last_name: familyName,
      invitation_id: this.state.invitation_id,
    };
    const token = response.tokenObj.access_token;

    const data = {
      "grant_type": "convert_token",
      "client_id": DJANGO_OAUTH_CLIENT_ID,
      "client_secret": DJANGO_OAUTH_CLIENT_SECRET,
      "backend": "google-oauth2",
      "token": token
    }
    this.setState({ loading: true, error: false });
    axios.post("/auth/convert-token", data)
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("access_token", token);

        this.props.googleLogin(user);
  
        if (this.state.invitation_id) {
          axios.setToken(token);
          axios
            .post(`/teams/invitation/${this.state.invitation_id}/confirm/`)
            .finally(() => {
              history.push("/app/admin/dashboard");
              window.location.reload();
            });
        } else {
          history.push("/app/admin/dashboard");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ 
          error: true,
          loading: false
        });
      });
  };

  onGoogleAuthFailure = (response) => {};

  render() {
    const { loading, error } = this.state;
    return (
      <>
        <AuthHeader
          title="Welcome!"
          lead="Use these awesome forms to login or create new account in your project for free."
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardHeader className="bg-transparent pb-5">
                  {error && (
                    <UncontrolledAlert color="danger" fade={false}>
                      <span className="alert-inner--icon">
                        <i className="ni ni-bell-55" />
                      </span>{" "}
                      <span className="alert-inner--text">
                        <strong>Error!</strong> Unable to log in with provided
                        credentials.
                      </span>
                    </UncontrolledAlert>
                  )}
                  <div className="text-muted text-center mt-3 mb-4">
                    <small style={{ fontSize: 18 }}>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <GoogleLogin
                      clientId="828042189691-4ceuofidhr2van7pt9vhpa4hmdei9d0q.apps.googleusercontent.com"
                      buttonText="Register"
                      onSuccess={this.onGoogleAuthSuccess}
                      onFailure={this.onGoogleAuthFailure}
                      cookiePolicy="single_host_origin"
                      render={({ onClick }) => {
                        return (
                          <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            onClick={() => {
                              onClick();
                            }}
                          >
                            <span className="btn-inner--icon mr-1">
                              <img alt="..." src={STATIC_FILES.google} />
                            </span>
                            <span className="btn-inner--text">
                              Sign in with Google
                            </span>
                          </Button>
                        );
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small style={{ fontSize: 18 }}>
                      Or sign in with credentials
                    </small>
                  </div>
                  <Form onSubmit={this.handleSubmit} role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="email"
                          onChange={this.handleChange}
                          value={this.state.email}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedPassword: false })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="custom-control custom-control-alternative custom-checkbox">
                      <input
                        className="custom-control-input"
                        id=" customCheckLogin"
                        type="checkbox"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor=" customCheckLogin"
                      >
                        <span className="text-muted">Remember me</span>
                      </label>
                    </div>
                    <div className="text-center">
                      <Button className="my-4" color="info" type="submit">
                        Sign in
                      </Button>
                    </div>
                  </Form>
                </CardBody>
                {loading && (
                  <div className="auth-loading-wrapper">
                    <i className="ml-2 fas fa-spinner fa-spin"></i>
                  </div>
                )}
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <Link to="/app/auth/forgetPassword">
                    <small className="text-light">ForgetPassword ?</small>
                  </Link>
                  {/* <a className="text-light" href="#pablo" onClick={e => e.preventDefault()}><small>Forgot password?</small></a> */}
                </Col>
                <Col className="text-right" xs="6">
                  <Link to="/app/auth/register">
                    <small className="text-light">Create new account</small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default connect(null, {
  login,
  googleLogin,
})(Login);
