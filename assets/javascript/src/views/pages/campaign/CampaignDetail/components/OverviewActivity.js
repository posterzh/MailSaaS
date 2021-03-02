import React from "react";
import { Container, Row, Col, Input } from "reactstrap";

export default function OverviewActivity() {
  return (
    <div>
      <Container>
        <Row className="mt-5">
          <Col md={3}>
            <Input id="selectFilter" type="select" className="form-control-sm">
              <option>All activities</option>
              <option value="Date">Ignore sends</option>
            </Input>
          </Col>
        </Row>
        <Row>
          <div></div>
        </Row>
      </Container>
    </div>
  );
}
