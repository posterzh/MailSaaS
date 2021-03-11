import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import WeekdayPicker from "./WeekdayPicker";

export default function CalendarCard({ calendar }) {
  // const { checkState, setCheckState, readonly } = calendar;
  const [checkState, setCheckState] = useState(0);
  const readonly = false;
  return (
    <>
      <Card className="card-stats">
        <CardBody>
          <Row>
            <Col>
              <WeekdayPicker
                checkState={checkState}
                setCheckState={setCheckState}
                readonly={readonly}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
}
