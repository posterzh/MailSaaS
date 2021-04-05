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
import axios from 'axios'
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
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
// core components
import AuthHeader from "../../../components/Headers/AuthHeader"
import {
  register,
  googleLogin,
} from "../../../redux/action/AuthAction"
import { connect } from "react-redux"
import { history } from "../../../index"
import { Alert } from 'reactstrap';

import GoogleLogin from 'react-google-login';
import Label from "reactstrap/lib/Label";

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      FirstName: '',
      LastName: '',
      Email: '',
      CompanyName: '',
      Password: '',
      mailsaas_type: 'Sales',
      isOpen: false,
      show: true,
      focusedFirstName: false,
      focusedEmail: false,
      focusedPassword: false,
      focusedCompany: false,
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // this.setState({show:!this.state.show})
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      first_name: this.state.FirstName,
      last_name: this.state.LastName,
      full_name: this.state.FirstName, // Assume full name is same to first name
      email: this.state.Email,
      company_name: this.state.CompanyName,
      password1: this.state.Password,
      mailsaas_type: this.state.mailsaas_type
    };
    console.log(this.props.register);
    this.props.register(user);
  }

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
    const { focusedFirstName, focusedLastName, focusedEmail, focusedCompany, focusedPassword } = this.state
    return (
      <>
        <AuthHeader
          title="Create an account"
          lead="Use these awesome forms to login or create new account in your project for free."
        />
        <Container className="mt--8 pb-5" >
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              <Card className="bg-secondary border-0">
                <CardHeader className="bg-transparent pb-5">
                  <div className="text-muted text-center mt-2 mb-4">
                    <small style={{ fontSize: 18 }}>Sign up with</small>
                  </div>
                  <div className="text-center">
                    <GoogleLogin
                      clientId="828042189691-4ceuofidhr2van7pt9vhpa4hmdei9d0q.apps.googleusercontent.com"
                      buttonText="Register"
                      onSuccess={this.onGoogleAuthSuccess}
                      onFailure={this.onGoogleAuthFailure}
                      autoLoad={false}
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
                            <span className="btn-inner--text">Sign up with Google</span>
                          </Button>
                        );
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small style={{ fontSize: 18 }}>Or sign up with credentials</small>
                  </div>
                  <Form onSubmit={this.handleSubmit} role="form">
                    <Row>
                      <Col>
                        <FormGroup
                          className={classnames({
                            focused: focusedFirstName
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
                              onFocus={() => { this.setState({ focusedFirstName: true }) }}
                              onBlur={() => { this.setState({ focusedFirstName: false }) }}
                              autoComplete='off'
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup
                          className={classnames({
                            focused: focusedLastName
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
                              onFocus={() => { this.setState({ focusedLastName: true }) }}
                              onBlur={() => { this.setState({ focusedLastName: false }) }}
                              autoComplete='off'
                              required
                            />
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup
                      className={classnames({
                        focused: focusedEmail
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
                          name='Email'
                          value={this.state.Email}
                          onChange={this.handleChange}
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                          autoComplete='off'
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: focusedCompany
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
                          onFocus={() => this.setState({ focusedCompany: true })}
                          onBlur={() => this.setState({ focusedCompany: false })}
                          autoComplete='off'
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: focusedPassword
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
                          onClick={() => { this.setState({ show: !this.state.show }) }}
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
                      <div >
                        {!this.state.show && <span className='password-message'> A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.</span>}
                      </div>
                      <FormGroup className='mt-4'>
                        <Label for="mailsaas_type">What are you using this for?</Label>
                        <Input id="mailsaas_type" type="select" name="mailsaas_type" value={this.state.mailsaas_type} onChange={this.handleChange} id="exampleSelect">
                          <option value='Sales'>Sales</option>
                          <option value='Marketing'>Marketing/PR</option>
                          <option value='Recruiting'>Recruiting</option>
                          {/* <option value='other'>Other</option> */}
                        </Input>
                      </FormGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="mt-4 mb-4" color="info" type="submit" >
                        Create account
                        {
                          false && (
                            <i className="ml-2 fas fa-spinner fa-spin"></i>
                          )
                        }
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
                  <Link to="/app/auth/login">
                    <small className="text-light">Already have account</small>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'fixed', bottom: 0, right: 0, left: 0 }}>
          <Alert className="alert_" toggle={() => {
            this.setState({ isOpen: true })
          }} isOpen={false} color="warning">{ }</Alert>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {
  register,
  googleLogin,
})(Register);
