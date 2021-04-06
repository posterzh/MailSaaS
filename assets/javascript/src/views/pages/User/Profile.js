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
import ReactQuill from "react-quill";
import { connect } from 'react-redux';
import { getProfile } from '../../../redux/action/ProfileAction';
import { defaultProfilePic } from '../../../utils/Common';

import PageHeader from "../../../components/Headers/PageHeader";

export class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id, getProfile } = this.props;
    getProfile(id);
  }

  render() {
    const { user } = this.props;

    return (
      <>
        <div>
          <div
            className="header pb-6 d-flex align-items-center justify-content-center"
            style={{ minHeight: "250px" }}
          >
            <span className="mask bg-v-gradient-info" />
            <Row>
              <Col>
                <h1 className="display-2 text-white">Hello {user.first_name}</h1>
              </Col>
            </Row>
          </div>
          <Container className="mt--6" fluid>
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
                          src={user.avatar_url ? user.avatar_url : defaultProfilePic}
                        />
                        <label className="profile-edit-icon">
                          <input
                            type="file"
                            name="profile-input"
                            hidden
                          />
                          <i className="fa fa-camera"></i>
                        </label>
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
                        {`${user.first_name} ${user.last_name}`}
                      </h5>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        {user.email}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="col-12">
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">User information</h3>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <h6 className="heading-small text-muted mb-4">
                            User information
                      </h6>
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
                                    defaultValue={user.first_name}
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
                                    defaultValue={user.last_name}
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
                                    defaultValue={user.company_name}
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
                                    defaultValue={user.email}
                                    name="email"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                        <Col md={6}>
                          <h6 className="heading-small text-muted mb-4">
                            Change Password
                      </h6>
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
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                  <CardFooter className="bg-transparent text-right">
                    <Button
                      color="info"
                      type="submit"
                      className="text-uppercase"
                    >
                      Save
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.auth.user.pk,
    user: state.profile.user
  }
};

export default connect(mapStateToProps, {
  getProfile
})(Profile);
