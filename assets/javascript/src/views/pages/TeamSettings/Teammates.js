import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";

import { toggleTopLoader, toastOnError, toastOnSuccess } from '../../../utils/Utils';
import axios from '../../../utils/axios';

export class Teammates extends Component {
  sendInvite = () => {
    toggleTopLoader(true);
    axios
      .post("/teams/send-invite/", {
        email: 'alexmailsaas2021@gmail.com',
        slug: 'testing-team3'
      })
      .then((response) => {
        const { data } = response;
        if (data.success) {
          return data.result;
        } else {
          return false;
        }
      })
      .catch((error) => {
        toastOnError({'error': error});
      })
      .finally(() => {
        toggleTopLoader(false);
      });   
  }

  saveTeam = () => {
    toggleTopLoader(true);
    axios
      .post("/teams/create/", {
        name: 'testing team'
      })
      .then((response) => {
        debugger;
        const { data } = response;
        if (data.success) {
          return data.result;
        } else {
          return false;
        }
      })
      .catch((error) => {
        toastOnError({'error': error});
      })
      .finally(() => {
        toggleTopLoader(false);
      });   
  }

  deleteTeam = () => {

  }

  render() {
    const teamMates = [
      {
        name: "Omaid Faizyar",
        email: "omaid@faizyar.com",
        isAdmin: "Yes",
      },
      {
        name: "Test User",
        email: "test@faizyar.com",
        isAdmin: "No",
      },
    ];

    return (
      <>
        <PageHeader
          current="Your team"
          parent="Team settings"
          showStatus={false}
        />

        <PageContainer title="Your team">
          <Container>
            <Row>
              <Col lg={6} md={6} sm={12} className="mobile-p-0">
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">Team information</h3>
                  </CardHeader>
                  <Form className="needs-validation" noValidate>
                    <CardBody>
                      <FormGroup>
                        <Input
                          id="team-name"
                          placeholder="Team Name"
                          required
                          type="text"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          id="bcc-email"
                          placeholder="Bcc every email"
                          required
                          type="text"
                        />
                      </FormGroup>
                    </CardBody>
                    <CardFooter className="bg-transparent">
                      <Button
                        color="info"
                        type="button"
                        size="sm"
                        className="text-uppercase"
                        onClick={this.saveTeam}
                      >
                        Save
                      </Button>
                      <Button
                        color="danger"
                        type="button"
                        size="sm"
                        className="text-uppercase ml-xs-0 mt-xs-1"
                        onClick={this.deleteTeam}
                      >
                        Delete Team
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
              <Col lg="6" md="6" sm="12" className="mobile-p-0">
                <Card>
                  <CardHeader>
                    <h3 className="mb-0">Add teammate</h3>
                  </CardHeader>
                  <Form className="needs-validation">
                    <CardBody>
                      <FormGroup>
                        <Input
                          id="full-name"
                          placeholder="Full Name"
                          required
                          type="text"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          id="email-address"
                          placeholder="Email Address"
                          required
                          type="email"
                        />
                      </FormGroup>
                      {/* <FormGroup className="d-flex">
                        <label className="custom-toggle mr-2">
                          <input id="is-admin" type="checkbox" />
                          <span
                            className="custom-toggle-slider rounded-circle"
                            data-label-off="No"
                            data-label-on="Yes"
                          />
                        </label>
                        <label htmlFor="is-admin">Make administrator</label>
                      </FormGroup> */}
                    </CardBody>
                    <CardFooter className="bg-transparent">
                      <Button
                        color="info"
                        size="sm"
                        type="submit"
                        className="text-uppercase"
                        onClick={this.sendInvite}
                      >
                        Send Invite
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="12" className="mb-5 mobile-p-0">
                <p>
                  Administrators can update billing, connect new mail accounts,
                  and invite people.
                </p>
                <Table
                  className="align-items-center table-flush"
                  responsive
                  hover
                >
                  <thead className="thead-light">
                    <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>IS ADMIN</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMates &&
                      teamMates.map((member, index) => (
                        <tr key={index}>
                          <td>{member.name}</td>
                          <td>{member.email}</td>
                          <td>{member.isAdmin}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        </PageContainer>
      </>
    );
  }
}

export default Teammates;
