import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import { isConstructorDeclaration } from "typescript";
import WeekdayPicker from "./WeekdayPicker";

export default class ShowCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail_account: "test@gmail.com",
      check_state: 5,
      start_time: "9:00:00",
      end_time: "9:00:00",
      time_zone: "NewYork",
      max_emails_per_day: 20,
      minutes_between_sends: 12,
      min_emails_to_send: 1,
      max_emails_to_send: 1,
    };
  }

  setcheck_state = (check_state) => {
    this.setState({ check_state });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { startEditing } = this.props;

    return (
      <>
        <Card className="card-stats">
          <CardHeader className="py-1">
            <FormGroup className="mb-2">
              <label className="form-control-label" htmlFor="mail_account">
                Mail account
              </label>
              <Input
                id="mail_account"
                name="mail_account"
                type="select"
                className="form-control-sm"
                onChange={this.handleChange}
              >
                <option>test1@gmail.com</option>
                <option>test2@gmail.com</option>
              </Input>
            </FormGroup>
          </CardHeader>
          <CardBody className="py-1">
            <Row>
              <Col>
                <FormGroup className="my-2">
                  <WeekdayPicker
                    check_state={this.state.check_state}
                    setcheck_state={this.setcheck_state}
                    readonly={true}
                  />
                </FormGroup>

                <FormGroup>
                  <p className="my-0">
                    6:00 AM to 11:00 PM (America/Los_Angeles)
                  </p>
                  <p className="my-0">Send no more than 20 emails per day</p>
                  <p className="my-0">Space emails out over the day</p>
                  <p className="my-0">Pause 12 minutes between sends</p>
                  <p className="my-0">Send at least 1 email at a time</p>
                  <p className="my-0">Send at most 1 email at a time</p>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="pt-2 pb-3">
            <Button color="secondary" type="button" onClick={startEditing}>
              EDIT RULES
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }
}
