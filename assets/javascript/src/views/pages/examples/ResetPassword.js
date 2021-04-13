import React, { Component } from 'react'
import classnames from "classnames";
import {
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
  Button,
  Card,
} from 'reactstrap'
import AuthHeader from "../../../components/Headers/AuthHeader.js";
import axios from "../../../utils/axios";
import { toggleTopLoader, toastOnSuccess, toastOnError } from "../../../utils/Utils";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props)

    const uid = props.match.params.uid;
    const token = props.match.params.token;

    this.state = {
      newPassword: '',
      confirmPassword: '',
      focusedNewPassword: false,
      focusedConfirmPassword: false,
      uid: uid,
      token: token,
      loading: false,
    }

    console.log(props);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { newPassword, confirmPassword, uid, token } = this.state;

    if (newPassword !== confirmPassword) {
      showNotification("warning", "New password and confirm password must be same");
      return;
    }

    this.setState({ loading: true });
    axios.post(`/rest-auth/password/reset/confirm/`, {
      "uid": uid,
      "token": token,
      "new_password1": newPassword,
      "new_password2": confirmPassword
    })
      .then((response) => {
        // toastOnSuccess("Password has been reset with the new password");
        this.props.history.push('/app/auth/login');
      })
      .catch((error) => {
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading } = this.state;

    return (
      <>
        <AuthHeader
          title="Reset Password"
          lead=""
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="7">
              <Card className="bg-secondary border-0 mb-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <Form onSubmit={this.handleSubmit} role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedNewPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="New Password"
                          type="password"
                          name="newPassword"
                          onChange={this.handleChange}
                          value={this.state.email}
                          onFocus={() => this.setState({ focusedNewPassword: true })}
                          onBlur={() => this.setState({ focusedNewPassword: false })}
                          autoComplete='off'
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedConfirmPassword
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-lock-circle-open" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Confirm Password"
                          type="password"
                          name="confirmPassword"
                          onChange={this.handleChange}
                          value={this.state.confirmPassword}
                          onFocus={() => this.setState({ focusedConfirmPassword: true })}
                          onBlur={() => this.setState({ focusedConfirmPassword: false })}
                          autoComplete='off'
                          required
                        />
                      </InputGroup>
                    </FormGroup>
                    <div className="text-center">
                      <Button className="my-4" color="info" type="submit">Reset password</Button>
                    </div>
                  </Form>
                </CardBody>
                {loading &&
                  <div className="auth-loading-wrapper">
                    <i className="ml-2 fas fa-spinner fa-spin"></i>
                  </div>
                }
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
