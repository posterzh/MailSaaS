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
  Label,
} from 'reactstrap'
import AuthHeader from "../../../components/Headers/AuthHeader.js";
import axios from "../../../utils/axios";
import { toggleTopLoader, toastOnSuccess, toastOnError } from "../../../utils/Utils";

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      sent: false,
      loading: false,
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;

    this.setState({ loading: true });
    axios.post(`/rest-auth/password/reset/`, { "email": email })
      .then((response) => {
        // toastOnSuccess("Password reset e-mail has been sent");
        this.setState({ sent: true });
      })
      .catch((error) => {
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { sent, loading } = this.state;

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
                  <Form onSubmit={this.handleSubmit} role="form" style={{height: 150}}>
                    {sent ?
                      <>
                        <label className="d-flex justify-content-center pt-5">
                          <span className="text-muted">Password reset e-mail has been sent!</span>
                        </label>
                      </> :
                      <>
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
                              name="email"
                              type="email"
                              onChange={this.handleChange}
                              value={this.state.email}
                              autoComplete='on'
                            />
                          </InputGroup>
                        </FormGroup>
                        <div className="text-center">
                          <Button className="my-4" color="info" type="submit">Send password reset email</Button>
                        </div>
                      </>
                    }
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
