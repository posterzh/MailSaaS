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
import axios from "../../../utils/axios";
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
  UncontrolledAlert,
} from "reactstrap";
import { Link } from "react-router-dom";
// core components
import AuthHeader from "../../../components/Headers/AuthHeader";
import { register, googleLogin } from "../../../redux/action/AuthAction";
import { connect } from "react-redux";
import { history } from "../../../index";
import { Alert } from "reactstrap";

import GoogleLogin from "react-google-login";
import {
  DJANGO_OAUTH_CLIENT_ID,
  DJANGO_OAUTH_CLIENT_SECRET
} from "../../../utils/Common";
import Label from "reactstrap/lib/Label";

class Register extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);
    const email = params.get("email");
    const invitation_id = params.get("invitation_id");
    console.log("invitation id: ", invitation_id);

    this.state = {
      FirstName: "",
      LastName: "",
      Email: email || "",
      CompanyName: "",
      Password: "",
      mailsaas_type: "Sales",
      isOpen: false,
      show: true,
      focusedFirstName: false,
      focusedEmail: false,
      focusedPassword: false,
      focusedCompany: false,
      loading: false,
      error: false,

      invitation_id: invitation_id,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // this.setState({show:!this.state.show})
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      first_name: this.state.FirstName,
      last_name: this.state.LastName,
      full_name: this.state.FirstName, // Assume full name is same to first name
      email: this.state.Email,
      company_name: this.state.CompanyName,
      password1: this.state.Password,
      mailsaas_type: this.state.mailsaas_type,
    };

    this.setState({ loading: true, error: false });
    axios
      .post("/rest-auth/registration/", user)
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("access_token", token);

        this.props.register(response.data.user);

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
    const {
      focusedFirstName,
      focusedLastName,
      focusedEmail,
      focusedCompany,
      focusedPassword,
      loading,
      error,
    } = this.state;
    return (
      <>
        <AuthHeader
          title="Create an account"
          lead="Use these awesome forms to login or create new account in your project for free."
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              <Card className="bg-secondary border-0">
                <CardHeader className="bg-transparent pb-5">
                  {error && (
                    <UncontrolledAlert color="danger" fade={false}>
                      <span className="alert-inner--icon">
                        <i className="ni ni-bell-55" />
                      </span>{" "}
                      <span className="alert-inner--text">
                        <strong>Error!</strong> Unable to register with provided
                        credentials.
                      </span>
                    </UncontrolledAlert>
                  )}
                  <div className="text-muted text-center mt-3 mb-4">
                    <small style={{ fontSize: 18 }}>Sign up with</small>
                  </div>
                  <div className="text-center">
                    <GoogleLogin
                      clientId="828042189691-4ceuofidhr2van7pt9vhpa4hmdei9d0q.apps.googleusercontent.com"
                      buttonText="Register"
                      onSuccess={this.onGoogleAuthSuccess}
                      onFailure={this.onGoogleAuthFailure}
                      cookiePolicy={"single_host_origin"}
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
                              Sign up with Google
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
                      Or sign up with credentials
                    </small>
                  </div>
                  <Form onSubmit={this.handleSubmit} role="form">
                    <Row>
                      <Col>
                        <FormGroup
                          className={classnames({
                            focused: focusedFirstName,
                          })}
                        >
                          <InputGroup className="input-group-merge input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="First Name"
                              type="text"
                              name="FirstName"
                              value={this.state.FirstName}
                              onChange={this.handleChange}
                              onFocus={() => {
                                this.setState({ focusedFirstName: true });
                              }}
                              onBlur={() => {
                                this.setState({ focusedFirstName: false });
                              }}
                              autoComplete="off"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup
                          className={classnames({
                            focused: focusedLastName,
                          })}
                        >
                          <InputGroup className="input-group-merge input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-hat-3" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Last Name"
                              type="text"
                              name="LastName"
                              value={this.state.LastName}
                              onChange={this.handleChange}
                              onFocus={() => {
                                this.setState({ focusedLastName: true });
                              }}
                              onBlur={() => {
                                this.setState({ focusedLastName: false });
                              }}
                              autoComplete="off"
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup
                      className={classnames({
                        focused: focusedEmail,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          name="Email"
                          value={this.state.Email}
                          onChange={this.handleChange}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                          autoComplete="off"
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: focusedCompany,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-building" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Comapany Name"
                          type="text"
                          name="CompanyName"
                          onChange={this.handleChange}
                          onFocus={() =>
                            this.setState({ focusedCompany: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedCompany: false })
                          }
                          autoComplete="off"
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: focusedPassword,
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
                          name="Password"
                          onClick={() => {
                            this.setState({ show: !this.state.show });
                          }}
                          onChange={this.handleChange}
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedPassword: false })
                          }
                          required
                        />
                      </InputGroup>
                      <div>
                        {!this.state.show && (
                          <span className="password-message">
                            {" "}
                            A minimum 8 characters password contains a
                            combination of uppercase and lowercase letter and
                            number are required.
                          </span>
                        )}
                      </div>
                      <FormGroup className="mt-4">
                        <Label for="mailsaas_type">
                          What are you using this for?
                        </Label>
                        <Input
                          id="mailsaas_type"
                          type="select"
                          name="mailsaas_type"
                          value={this.state.mailsaas_type}
                          onChange={this.handleChange}
                          id="exampleSelect"
                        >
                          <option value="Sales">Sales</option>
                          <option value="Marketing">Marketing/PR</option>
                          <option value="Recruiting">Recruiting</option>
                          {/* <option value='other'>Other</option> */}
                        </Input>
                      </FormGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="mt-4 mb-4" color="info" type="submit">
                        Create account
                        {false && (
                          <i className="ml-2 fas fa-spinner fa-spin"></i>
                        )}
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
                  <Link to="/app/auth/login">
                    <small className="text-light">Already have account</small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Alert
            className="alert_"
            toggle={() => {
              this.setState({ isOpen: true });
            }}
            isOpen={false}
            color="warning"
          >
            {}
          </Alert>
        </div>
      </>
    );
  }
}

export default connect(null, {
  register,
  googleLogin,
})(Register);
