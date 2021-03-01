import React, { Component } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Alert,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";

export class Setting extends Component {
  render() {
    return (
      <>
        <PageHeader
          current="Settings"
          parent="Team settings"
          showStatus={false}
        />

        <PageContainer title="Settings">
          <Container fluid>
            <Row>
              <Col lg={6} md={8} sm={12}>
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">Team Information</h3>
                  </CardHeader>
                  <Form className="needs-validation" noValidate>
                    <CardBody>
                      <Col md={12}>
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="team-name"
                          >
                            Team Name
                          </label>
                          <Input
                            id="team-name"
                            placeholder="Team Name"
                            required
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </CardBody>
                    <CardFooter className="bg-transparent">
                      <Button
                        color="info"
                        type="submit"
                        className="text-uppercase"
                      >
                        Save
                      </Button>
                      <Button
                        color="danger"
                        type="submit"
                        className="text-uppercase"
                        style={{ marginLeft: 0 }}
                      >
                        Delete Team
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <h1 className="mt-5 mb-3">SENDING SETTINGS</h1>
            <Row>
              <Col md={6} sm={12}>
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">Custom tracking domains</h3>
                  </CardHeader>
                  <Form className="needs-validation" noValidate>
                    <CardBody>
                      <Row>
                        <Col>
                          <p className="mb-0">
                            Use your own domain to track opens and clicks
                          </p>
                          <p>
                            <a href="#">Learn how his works</a>
                          </p>
                          <ol>
                            <li>
                              <p className="text-muted mb-0">
                                Use your DNS provider to create a CNAME record
                                that points to{" "}
                                <code>tracking.mailsaas.com</code>
                              </p>
                            </li>
                            <li>
                              <p className="text-muted mb-0">
                                Enter your sub-domain below save these changes
                              </p>
                            </li>
                          </ol>
                          <Alert color="default">
                            <span className="alert-inner--icon">
                              <i class="fa fa-info-circle"></i>
                            </span>
                            <span className="alert-inner--text ml-1">
                              You should use a sub-domain like{" "}
                              <code>tracking.mailsaas.com</code>
                            </span>
                          </Alert>
                        </Col>
                      </Row>
                      <div className="form-row">
                        <Col md={12}>
                          <FormGroup>
                            <Input
                              id="your-domain-name"
                              placeholder="Your domain name"
                              required
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </div>
                    </CardBody>
                    <CardFooter className="bg-transparent">
                      <Button
                        color="info"
                        type="submit"
                        className="text-uppercase"
                      >
                        Save
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
              <Col md={6} sm={12}>
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">Campaign settings</h3>
                  </CardHeader>
                  <Form className="needs-validation" noValidate>
                    <CardBody>
                      <div className="form-row">
                        <Col md={12}>
                          <FormGroup>
                            <Input
                              id="bcc-email"
                              placeholder="Bcc every email"
                              required
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="list-cleaning"
                            >
                              show list-cleaning feature?
                            </label>
                            <Input id="list-cleaning" required type="select">
                              <option>Yes</option>
                              <option selected>No</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="unsubscribe-link"
                            >
                              How should unsubscribe link works?
                            </label>
                            <Input id="unsubscribe-link" required type="select">
                              <option>One-Click</option>
                              <option selected>Two-click</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="enable-dialer"
                            >
                              Enable mailassas dialer
                            </label>
                            <Input id="enable-dialer" required type="select">
                              <option>Yes</option>
                              <option selected>No</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <a href="#">looking to hookup your CRM?</a>
                      </div>
                    </CardBody>
                    <CardFooter className="bg-transparent">
                      <Button
                        color="info"
                        type="submit"
                        className="text-uppercase"
                      >
                        Save
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <h1 className="mt-5 mb-3">USEFUL LINKS</h1>
            <ListGroup>
              <ListGroupItem
                className="list-group-item-action"
                href="#"
                onClick={(e) => e.preventDefault()}
                tag="a"
              >
                CHANGE TEAMMATES
              </ListGroupItem>
              <ListGroupItem
                className="list-group-item-action"
                href="#"
                onClick={(e) => e.preventDefault()}
                tag="a"
              >
                UPDATE BILLING
              </ListGroupItem>
              <ListGroupItem
                className="list-group-item-action"
                href="#"
                onClick={(e) => e.preventDefault()}
                tag="a"
              >
                YOUR PERSONAL SETTINGS
              </ListGroupItem>
            </ListGroup>
          </Container>
        </PageContainer>
      </>
    );
  }
}

export default Setting;
