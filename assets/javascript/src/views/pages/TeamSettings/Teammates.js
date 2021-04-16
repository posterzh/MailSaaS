import React, { useState, useEffect } from "react";
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

import {
  toggleTopLoader,
  toastOnError,
  toastOnSuccess,
  messages,
} from "../../../utils/Utils";
import axios from "../../../utils/axios";

export function Teammates(props) {
  const [teamname, setTeamname] = useState("");
  const [bccEmail, setBccEmail] = useState("");
  const [otherFullname, setOtherFullname] = useState("");
  const [otherEmail, setOtherEmail] = useState("");
  const [permission, setPermission] = useState("read");

  const sendInvite = () => {
    toggleTopLoader(true);
    axios
      .post("/teams/send-invite/", {
        email: "alexmailsaas2021@gmail.com",
        slug: "testing-team3",
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
        toastOnError({ error: error });
      })
      .finally(() => {
        toggleTopLoader(false);
      });
  };

  const createTeam = () => {
    toggleTopLoader(true);
    axios
      .post("/teams/api/teams/", {
        name: teamname,
        bccEmail: bccEmail,
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
        toastOnError({ error: error });
      })
      .finally(() => {
        toggleTopLoader(false);
      });
  };

  const saveTeam = () => {};

  useEffect(async () => {
    try {
      toggleTopLoader(true);
      const { data } = await axios.get("/teams/api/teams/");
      console.log("Teammates: ", data);
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }, []);

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
                        value={teamname}
                        onChange={(e) => setTeamname(e.target.value)}
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
                    {!teamname && (
                      <Button
                        color="info"
                        type="button"
                        size="sm"
                        className="text-uppercase"
                        onClick={createTeam}
                      >
                        Create
                      </Button>
                    )}
                    {teamname && (
                      <Button
                        color="info"
                        type="button"
                        size="sm"
                        className="text-uppercase"
                        onClick={saveTeam}
                      >
                        Save
                      </Button>
                    )}
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
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="selectFromAddress"
                      >
                        Permission
                      </label>
                      <Input
                        id="selectFromAddress"
                        type="select"
                        className="form-control-sm"
                        value={permission}
                        onChange={(e) => setPermission(e.target.value)}
                      >
                        <option value="read">Read Campaign</option>
                        <option value="create">Create Campaign</option>
                        <option value="update">Update Campaign</option>
                      </Input>
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
                      onClick={sendInvite}
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

export default Teammates;
