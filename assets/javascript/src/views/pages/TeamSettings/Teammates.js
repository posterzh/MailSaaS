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
  Spinner,
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
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState({
    name: "",
    bcc_email: "",
  });
  const [members, setMembers] = useState([]);

  const [invitee, setInvitee] = useState({
    email: "",
    role: "read",
  });

  const user = useSelector((state) => state.auth.user);

  const sendInvite = async (e) => {
    e.preventDefault();

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

  const handleTeamInfo = async (e) => {
    e.preventDefault();
    if (team.id) {
      saveTeam();
    } else {
      createTeam();
    }
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
      }

      setLoading(false);
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }, []);

  useEffect(() => {
    if (team && team.members) {
      const sorted = team.members.sort((a, b) => (a.role > b.role ? 1 : -1));
      setMembers(sorted);
    }
  }, [team]);

  return (
    <>
      <PageHeader current="My team" parent="Team settings" showStatus={false} />
      <PageContainer title="My team">
        {loading && (
          <div className="d-flex my-5">
            <Spinner color="primary" className="m-auto" />
          </div>
        )}
        {!loading && (
          <Container>
            <Row>
              <Col lg={6} md={6} sm={12} className="mobile-p-0">
                <Card>
                  <CardHeader className="pb-0">
                    <h3 className="mb-0">Team information</h3>
                  </CardHeader>
                  <Form className="needs-validation" onSubmit={handleTeamInfo}>
                    <CardBody className="pb-0">
                      <FormGroup>
                        <Input
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
                        <label className="form-control-label">Bcc Email</label>
                        <Input
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
                      <Button
                        color="info"
                        type="submit"
                        size="sm"
                        className="text-uppercase"
                      >
                        {team.id ? "Save" : "Create"}
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
              {team.id && (
                <>
                  <Col lg="6" md="6" sm="12" className="mobile-p-0">
                    <Card>
                      <CardHeader className="pb-0">
                        <h3 className="mb-0">Add teammate</h3>
                      </CardHeader>
                      <Form className="needs-validation" onSubmit={sendInvite}>
                        <CardBody className="pb-0">
                          <FormGroup>
                            <Input
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
                            <label className="form-control-label">
                              Permission
                            </label>
                            <Input
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
                            type="submit"
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
            {team.id && (
              <Row>
                <Col sm="12" className="mb-5 mobile-p-0">
                  <p>
                    Administrator can update billing, connect new mail accounts,
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
                        <th>PERMISSION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, index) => (
                        <tr key={index}>
                          <td>{member.first_name}</td>
                          <td>{member.email}</td>
                          <td>{member.role === "admin" ? "Admin" : ""}</td>
                          <td>
                            {member.role === "admin" ? "" : member.permission}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}
          </Container>
        )}
      </PageContainer>
    </>
  );
}

export default Teammates;
