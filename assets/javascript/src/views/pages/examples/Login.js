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
} from "reactstrap";
import { Link } from "react-router-dom";
import AuthHeader from "../../../components/Headers/AuthHeader.js";
import {
  login,
  googleLogin,
} from "../../../redux/action/AuthAction";
import { connect } from "react-redux";
import { history } from "../../../index";

import Api from "../../../../src/redux/api/api";
import axios from "../../../utils/axios";

import GoogleLogin from 'react-google-login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      focusedEmail: false,
      focusedPassword: false,
      loginPending: false,
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
    this.props.login(user);
  };

  onGoogleAuthSuccess = (response) => {
    const { email, name, givenName, familyName } = response.profileObj;
    const user = {
      username: name,
      email: email,
      first_name: givenName,
      last_name: familyName,
    }
    const token = response.tokenObj.access_token; console.log(response);
    this.props.googleLogin(user, token);
  };

  onGoogleAuthFailure = (response) => {

  }

  render() {
    const { Loginuser, isLogin, loginResponse } = this.props;
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
                  <div className="text-muted text-center mt-2 mb-4">
                    <small style={{ fontSize: 18 }}>Sign in with</small>
                  </div>
                  <div className="btn-wrapper text-center">
                    <GoogleLogin
                      clientId="828042189691-4ceuofidhr2van7pt9vhpa4hmdei9d0q.apps.googleusercontent.com"
                      buttonText="Register"
                      onSuccess={this.onGoogleAuthSuccess}
                      onFailure={this.onGoogleAuthFailure}
                      autoLoad = {false}
                      isSignedIn={false}
                      cookiePolicy={'single_host_origin'}
                      render={({ onClick }) => {
                        return (
                          <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={() => {
                              onClick();
                            }}
                          >
                            <span className="btn-inner--icon mr-1">
                              <img alt="..." src={'/static/images/img/icons/common/google.svg'} />
                            </span>
                            <span className="btn-inner--text">Sign in with Google</span>
                          </Button>
                        );
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small style={{ fontSize: 18 }}>Or sign in with credentials</small>
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
                {this.props.isLoading &&
                  <div className="auth-loading-wrapper">
                    <i className="ml-2 fas fa-spinner fa-spin"></i>
                  </div>
                }
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

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {
  login,
  googleLogin,
})(Login);
