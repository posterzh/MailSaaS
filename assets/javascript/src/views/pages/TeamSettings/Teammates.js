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
import { useSelector } from "react-redux";
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
  const [team, setTeam] = useState({
    name: "",
    bcc_email: "",
  });
  const [invitee, setInvitee] = useState({
    email: "",
    role: "read",
  });

  const user = useSelector((state) => state.auth.user);

  const sendInvite = async () => {
    console.log("Sending invitation : ", invitee);
    const data = {
      team: team.id,
      email: invitee.email,
      permission: invitee.permission,
      invited_by: user.pk,
    };
    try {
      toggleTopLoader(true);
      const result = await axios.post("/teams/api/send-invite/", data);
      console.log("Invitation result: ", result.data);
    } catch (e) {
      toastOnError(messages.api_failed);
      return;
    } finally {
      toggleTopLoader(false);
    }

    toastOnSuccess("Sent invitation successfully!");
  };

  const createTeam = async () => {
    console.log("Create team : ", team);
    try {
      toggleTopLoader(true);
      const { data } = await axios.post("/teams/api/teams/", { ...team });
      console.log("Created team: ", data);
      setTeam(data);
    } catch (e) {
      toastOnError(messages.api_failed);
      return;
    } finally {
      toggleTopLoader(false);
    }

    toastOnSuccess("Created a team successfully!");
  };

  const saveTeam = async () => {
    console.log("Update team : ", team);
    try {
      toggleTopLoader(true);
      const { data } = await axios.put(`/teams/api/teams/${team.id}/`, {
        ...team,
      });
      console.log("Updated team: ", data);
      setTeam(data);
    } catch (e) {
      toastOnError(messages.api_failed);
      return;
    } finally {
      toggleTopLoader(false);
    }

    toastOnSuccess("Updated team successfully!");
  };

  useEffect(async () => {
    try {
      toggleTopLoader(true);
      const { data } = await axios.get("/teams/api/teams/", {
        role: "admin",
      });
      console.log("Teammates: ", data);
      if (data.length > 0) {
        setTeam(data[0]);
        console.log(team);
      }
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
                        value={team.name}
                        onChange={(e) =>
                          setTeam({
                            ...team,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        id="bcc-email"
                        placeholder="Bcc every email"
                        type="text"
                        value={team.bcc_email}
                        onChange={(e) => {
                          setTeam({
                            ...team,
                            bcc_email: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </CardBody>
                  <CardFooter className="bg-transparent">
                    {!team.id && (
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
                    {team.id && (
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
            {team.id && (
              <>
                <Col lg="6" md="6" sm="12" className="mobile-p-0">
                  <Card>
                    <CardHeader>
                      <h3 className="mb-0">Add teammate</h3>
                    </CardHeader>
                    <Form className="needs-validation">
                      <CardBody>
                        <FormGroup>
                          <Input
                            id="email-address"
                            placeholder="Email Address"
                            required
                            type="email"
                            value={invitee.email}
                            onChange={(e) => {
                              setInvitee({
                                ...invitee,
                                email: e.target.value,
                              });
                            }}
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
                            value={invitee.permission}
                            onChange={(e) =>
                              setInvitee({
                                ...invitee,
                                permission: e.target.value,
                              })
                            }
                          >
                            <option value="read">Read Campaign</option>
                            <option value="create">Create Campaign</option>
                            <option value="update">Update Campaign</option>
                          </Input>
                        </FormGroup>
                      </CardBody>
                      <CardFooter className="bg-transparent">
                        <Button
                          color="info"
                          size="sm"
                          className="text-uppercase"
                          onClick={sendInvite}
                        >
                          Send Invite
                        </Button>
                      </CardFooter>
                    </Form>
                  </Card>
                </Col>
              </>
            )}
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
