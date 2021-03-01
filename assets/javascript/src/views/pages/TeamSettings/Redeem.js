import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
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

export class Redeem extends Component {
  render() {
    return (
      <>
        <PageHeader
          current="Redeem a promotion"
          parent="Team settings"
          showStatus={false}
        />

        <PageContainer title="Redeem a promotion">
          <Container fluid>
            <Row>
              <Col md="6">
                <p>
                  Do you have a promo code? Apply it to your team:{" "}
                  <span className="font-weight-bold">Team Name</span>
                </p>
                <Card>
                  <Form className="needs-validation">
                    <CardBody>
                      <div className="form-row">
                        <Col md={12}>
                          <FormGroup>
                            <Input
                              id="promo-code"
                              placeholder="Promo code"
                              required
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </div>
                    </CardBody>
                    <CardFooter className="bg-transparent">
                      <Button color="info" type="submit">
                        APPLYPROMO
                      </Button>
                    </CardFooter>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </PageContainer>
      </>
    );
  }
}

export default Redeem;
