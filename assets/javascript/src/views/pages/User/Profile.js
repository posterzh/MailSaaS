import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
  CardFooter,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import { toggleTopLoader, toastOnError, toastOnSuccess, showNotification } from "../../../utils/Utils";
import axios from "../../../utils/axios";

import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      avatar_url: '',
      user: {},
      old_password: '',
      new_password: '',
      confirm_password: ''
    };
  }

  componentDidMount() {
    this.readUserInfo();
  }

  readUserInfo = () => {
    toggleTopLoader(true);
    axios.get(`/rest-auth/user/`)
      .then((response) => {
        const user = response.data;
        this.setState({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar_url: user.avatar_url,
          user: user
        });
      })
      .catch((error) => {
        toastOnError(error);
      })
      .finally(() => {
        toggleTopLoader(false);
      });
  }

  saveUserInfo = () => {
    const { user } = this.state;

    toggleTopLoader(true);
    axios.put(`/rest-auth/user/`, user)
      .then((response) => {
        const user = response.data;
        this.setState({
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          avatar_url: user.avatar_url,
          user: user
        });
        toastOnSuccess("Successfully updated");
      })
      .catch((error) => {
        toastOnError(error);
      })
      .finally(() => {
        toggleTopLoader(false);
      });
  }

  savePassword = () => {
    const { old_password, new_password, confirm_password } = this.state;

    if (!old_password) {
      showNotification("warning", "Please enter the old password");
      return;
    }

    if (!new_password) {
      showNotification("warning", "Please enter the new password");
    }

    if (new_password !== confirm_password) {
      showNotification("warning", "New password and confirm password must be same");
    }

    toggleTopLoader(true);
    axios.post(`/rest-auth/password/change/`, {
      "new_password1": new_password,
      "new_password2": confirm_password,
      "old_password": old_password
    })
      .then((response) => {
        toastOnSuccess("Successfully updated");
      })
      .catch((error) => {
        toastOnError(error);
      })
      .finally(() => {
        toggleTopLoader(false);
      });
  }

  render() {
    const { first_name, last_name, email, avatar_url } = this.state;
    const { user, old_password, new_password, confirm_password } = this.state;

    return (
      <div>
        <PageHeader
          parent="Profile"
          showStatus={false}
        />
        <Container className="mt--3" fluid>
          <Row>
            <Col className="col-12">
              <Card className="card-profile">
                <CardHeader className="p-0 mb-5 border-0">
                  <Row className="justify-content-center">
                    <div className="card-profile-image">
                      <img
                        alt="..."
                        className="profile-rounded-img"
                        style={{ background: "ghostwhite" }}
                        src={avatar_url ? avatar_url : STATIC_FILES.default_avatar}
                      />
                    </div>
                  </Row>
                </CardHeader>
                <CardBody className="pt-0">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center">

                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h5 className="h3">
                      {first_name && last_name && `${first_name} ${last_name}`}
                    </h5>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      {email}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="col-6">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">User information</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="first-name"
                            >
                              First name
                              </label>
                            <Input
                              id="first-name"
                              placeholder="First name"
                              type="text"
                              value={user.first_name || ''}
                              onChange={e => {
                                user.first_name = e.target.value;
                                this.setState({
                                  user: user
                                });
                              }}
                              name="firstName"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="last-name"
                            >
                              Last name
                              </label>
                            <Input
                              id="last-name"
                              placeholder="Last name"
                              type="text"
                              value={user.last_name || ''}
                              onChange={e => {
                                user.last_name = e.target.value;
                                this.setState({
                                  user: user
                                });
                              }}
                              name="lastName"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="companyName"
                            >
                              Company name
                              </label>
                            <Input
                              id="company-name"
                              placeholder="Company name"
                              type="text"
                              value={user.company_name || ''}
                              onChange={e => {
                                user.company_name = e.target.value;
                                this.setState({
                                  user: user
                                });
                              }}
                              name="companyName"
                              autoComplete='off'
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="email"
                            >
                              Email address
                              </label>
                            <Input
                              id="email"
                              placeholder="jesse@example.com"
                              type="email"
                              value={user.email || ''}
                              onChange={e => {
                                user.email = e.target.value;
                                this.setState({
                                  user: user
                                });
                              }}
                              name="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
                <CardFooter className="bg-transparent text-right">
                  <Button
                    color="info"
                    type="submit"
                    className="text-uppercase"
                    onClick={this.saveUserInfo}
                  >
                    Save Profile
                    </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col className="col-6">
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Password</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="old-password"
                            >
                              Old Password
                              </label>
                            <Input
                              id="old-password"
                              placeholder="Old Password"
                              type="password"
                              value={old_password}
                              onChange={e => {
                                this.setState({
                                  old_password: e.target.value
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="new-password"
                            >
                              New Password
                              </label>
                            <Input
                              id="new-password"
                              placeholder="New Password"
                              type="password"
                              value={new_password}
                              onChange={e => {
                                this.setState({
                                  new_password: e.target.value
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="confirm-password"
                            >
                              Confirm Password
                              </label>
                            <Input
                              id="confirm-password"
                              placeholder="Confirm Password"
                              type="password"
                              value={confirm_password}
                              onChange={e => {
                                this.setState({
                                  confirm_password: e.target.value
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
                <CardFooter className="bg-transparent text-right">
                  <Button
                    color="info"
                    type="submit"
                    className="text-uppercase"
                    onClick={this.savePassword}
                  >
                    Save Password
                    </Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profile;
