import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Input,
  Nav,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";

class PageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, title } = this.props;
    return (
      <>
        <Container fluid className="mt--5">
          <Row className="justify-content-center">
            <Col className="card-wrapper ct-example" lg="8">
              <Card>
                <CardHeader>
                  <h2 className="mb-0 text-center display-2">
                    {title}
                  </h2>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md={8}>
                      {children}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PageContainer;
