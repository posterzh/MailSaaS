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
import Dropzone from "dropzone";

import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import ProfileHeader from "../../../components/Headers/ProfileHeader";

Dropzone.autoDiscover = false;

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: "Test",
        lastName: "user",
        email: "test@gmail.com",
        userName: "Test123",
        profile_url: STATIC_FILES.team_4,
      },
    };
  }

  componentDidMount() {
    let currentSingleFile = undefined;
    new Dropzone(document.getElementById("dropzone-single"), {
      url: "/",
      thumbnailWidth: null,
      thumbnailHeight: null,
      previewsContainer: document.getElementsByClassName(
        "dz-preview-single"
      )[0],
      previewTemplate: document.getElementsByClassName("dz-preview-single")[0]
        .innerHTML,
      maxFiles: 1,
      acceptedFiles: "image/*",
      init: function () {
        this.on("addedfile", function (file) {
          if (currentSingleFile) {
            this.removeFile(currentSingleFile);
          }
          currentSingleFile = file;
        });
      },
    });
    document.getElementsByClassName("dz-preview-single")[0].innerHTML = "";
  }

  render() {
    const { user } = this.state;
    const setUser = (e) => {
      this.setState({
        user: { ...user, [e.target.name]: e.target.value },
      });
    };

    return (
      <>
        <PageHeader parent="My Profile" showStatus={false} />

        <PageContainer cardBodyClassNames="p-0">
          <ProfileHeader firstName={user.firstName} />
          <Container className="mt--6" fluid>
            <Row>
              <Col className="order-xl-2" xl="4">
                <Card className="card-profile">
                  <CardHeader className="p-0 mb-5">
                    <Row className="justify-content-center">
                      <Col className="" lg="3">
                        <div className="card-profile-image">
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={user.profile_url}
                          />
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="pt-0">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Draft</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Working</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Paused</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className="text-center">
                      <h5 className="h3">
                        {`${user.firstName} ${user.lastName}`}
                      </h5>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        {user.email}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col className="order-xl-1" xl="8">
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">User information</h3>
                  </CardHeader>
                  <CardBody>
                    <Form>
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
                              value={user.firstName}
                              name="firstName"
                              onChange={setUser}
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
                              value={user.lastName}
                              name="lastName"
                              onChange={setUser}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="username"
                            >
                              Username
                            </label>
                            <Input
                              id="username"
                              placeholder="Username"
                              type="text"
                              value={user.userName}
                              name="userName"
                              onChange={setUser}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
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
                              value={user.email}
                              name="email"
                              onChange={setUser}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="12">
                          <label
                            className="form-control-label"
                            htmlFor="profile"
                          >
                            Profile
                          </label>
                          <div
                            className="dropzone dropzone-single mb-3"
                            id="dropzone-single"
                          >
                            <div className="fallback">
                              <div className="custom-file">
                                <Input
                                  className="custom-file-input"
                                  id="profile"
                                  type="file"
                                />
                              </div>
                            </div>
                            <div className="dz-preview dz-preview-single">
                              <div className="dz-preview-cover">
                                <img
                                  alt="..."
                                  className="dz-preview-img"
                                  data-dz-thumbnail=""
                                />
                              </div>
                            </div>
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
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">Change Password</h3>
                  </CardHeader>
                  <CardBody>
                    <Form>
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
        </PageContainer>
      </>
    );
  }
}

export default Profile;
