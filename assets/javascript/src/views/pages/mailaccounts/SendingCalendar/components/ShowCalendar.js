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

export default function ShowCalendar({ calendar, startEditing }) {
  console.log("calendar : ", calendar);

  if (!calendar) {
    return <h5>Loading...</h5>;
  } else {
    return (
      <>
        <FormGroup className="mt-4 mb-1">
          <WeekdayPicker block_days={calendar.block_days} readonly={true} />
        </FormGroup>
        <FormGroup>
          <p className="my-2">
            <span className="font-weight-bold">{calendar.start_time}</span> to{" "}
            <span className="font-weight-bold">{calendar.end_time}</span> (
            {calendar.time_zone})
          </p>
          <p className="my-2">
            Send no more than{" "}
            <span className="font-weight-bold">
              {calendar.max_emails_per_day}
            </span>{" "}
            emails per day
          </p>
          <p className="my-2">
            Pause{" "}
            <span className="font-weight-bold">
              {calendar.minutes_between_sends}
            </span>{" "}
            minutes between sends
          </p>
          <p className="my-2">
            Send at least{" "}
            <span className="font-weight-bold">
              {calendar.min_emails_to_send}
            </span>{" "}
            email at a time
          </p>
          <p className="my-2 ">
            Send at most{" "}
            <span className="font-weight-bold">
              {calendar.max_emails_to_send}
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
