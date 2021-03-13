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
      check_state: 5,
      start_time: "9:00 AM",
      end_time: "5:00 PM",
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
        <FormGroup className="mt-4 mb-1">
          <WeekdayPicker
            check_state={this.state.check_state}
            setcheck_state={this.setcheck_state}
            readonly={true}
          />
        </FormGroup>

        <FormGroup>
          <p className="my-2">
            <span className="font-weight-bold">{this.state.start_time}</span> to{" "}
            <span className="font-weight-bold">{this.state.end_time}</span> (
            {this.state.time_zone})
          </p>
          <p className="my-2">
            Send no more than{" "}
            <span className="font-weight-bold">
              {this.state.max_emails_per_day}
            </span>{" "}
            emails per day
          </p>
          <p className="my-2">
            Pause{" "}
            <span className="font-weight-bold">
              {this.state.minutes_between_sends}
            </span>{" "}
            minutes between sends
          </p>
          <p className="my-2">
            Send at least{" "}
            <span className="font-weight-bold">
              {this.state.min_emails_to_send}
            </span>{" "}
            email at a time
          </p>
          <p className="my-2 ">
            Send at most{" "}
            <span className="font-weight-bold">
              {this.state.max_emails_to_send}
            </span>{" "}
            email at a time
          </p>
        </FormGroup>

        <Button color="secondary" type="button" onClick={startEditing}>
          EDIT RULES
        </Button>
      </>
    );
  }
}
