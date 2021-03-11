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

export default class EditCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail_account: "",
      check_state: 0,
      start_time: "",
      end_time: "",
      time_zone: "",
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
    const { saveEditing, cancelEditing } = this.props;

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
                <FormGroup className="mb-2">
                  <label className="form-control-label">Blocked out days</label>
                  <WeekdayPicker
                    check_state={this.state.check_state}
                    setcheck_state={this.setcheck_state}
                    readonly={false}
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <label className="form-control-label" htmlFor="start_time">
                    Start time
                  </label>
                  <Input
                    defaultValue="10:30:00"
                    id="start_time"
                    name="start_time"
                    className="form-control-sm"
                    type="time"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <label className="form-control-label" htmlFor="end_time">
                    End time
                  </label>
                  <Input
                    defaultValue="10:30:00"
                    id="end_time"
                    name="end_time"
                    className="form-control-sm"
                    type="time"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <label className="form-control-label" htmlFor="mail_account">
                    Timezone
                  </label>
                  <Input
                    id="mail_account"
                    name="mail_account"
                    className="form-control-sm"
                    type="select"
                    className="form-control-sm"
                    onChange={this.handleChange}
                  >
                    <option>America/Los_Angles</option>
                    <option>America/New_York</option>
                  </Input>
                </FormGroup>

                <FormGroup className="mb-2">
                  <label
                    className="form-control-label"
                    htmlFor="max_emails_per_day"
                  >
                    Max emails per day
                  </label>
                  <Input
                    id="max_emails_per_day"
                    name="max_emails_per_day"
                    className="form-control-sm"
                    type="number"
                    value={this.state.max_emails_per_day}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <label
                    className="form-control-label"
                    htmlFor="minutes_between_sends"
                  >
                    Minutes between sends
                  </label>
                  <Input
                    id="minutes_between_sends"
                    name="minutes_between_sends"
                    className="form-control-sm"
                    type="number"
                    value={this.state.minutes_between_sends}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <label
                    className="form-control-label"
                    htmlFor="min_emails_to_send"
                  >
                    Minimum emails to send at a time
                  </label>
                  <Input
                    id="min_emails_to_send"
                    name="min_emails_to_send"
                    className="form-control-sm"
                    type="number"
                    value={this.state.min_emails_to_send}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup className="mb-2">
                  <label
                    className="form-control-label"
                    htmlFor="max_emails_to_send"
                  >
                    Maximum emails to send at a time
                  </label>
                  <Input
                    id="max_emails_to_send"
                    name="max_emails_to_send"
                    className="form-control-sm"
                    type="number"
                    value={this.state.max_emails_to_send}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
          <CardFooter className="pt-2 pb-3">
            <Button
              color="danger"
              type="button"
              className="px-4"
              onClick={saveEditing}
            >
              SAVE
            </Button>
            <Button
              color="secondary"
              type="button"
              className="px-3"
              onClick={cancelEditing}
            >
              CANCEL
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }
}
