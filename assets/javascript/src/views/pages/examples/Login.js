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
  Col
} from "reactstrap";
import AuthHeader from "../../../components/Headers/AuthHeader.js";
import { LoginAction } from "../../../redux/action/AuthourizationAction"
import { connect } from "react-redux"

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });

  }
  handleSubmit = (event) => {
    event.preventDefault();
    const loginuser = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.LoginAction(loginuser)
    console.log(loginuser)
    // const token =localStorage.("access_token")
    // if(token)
    // {
    //   alert("bjnm")
    // }
  }
  render() {
    const { Loginuser, isLogin } = this.props
    return (
      <>
        <AuthHeader
          title="Welcome!"
          lead="Use these awesome forms to login or create new account in your project for free."
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="5" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form onSubmit={this.handleSubmit} role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail
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
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword
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
                  <Row style={{ backgroundColor: "" }}>
                    <div style={{}}>
                      {
                        isLogin ? <p style={{ color: 'green' }}>Sucessufully Login</p> : <p style={{ color: 'red' }}>Unable to log in with provided credentials.</p>
                      }

                    </div>

                  </Row>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a className="text-light" href="#pablo" onClick={e => e.preventDefault()}><small>Forgot password?</small></a>
                </Col>
                <Col className="text-right" xs="6"><a
                    className="text-light"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>

        </Container>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log("cheking login details======>", state.LoginReducer.Loginuser, state.LoginReducer.isLogin)
  return {
    Loginuser: state.LoginReducer.Loginuser,
    isLogin: state.LoginReducer.isLogin,
  }
};

const mapDispatchToProps = dispatch => ({
  LoginAction: Loginuser => { dispatch(LoginAction(Loginuser)); },
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);

