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
    const { children, title, showHelper } = this.props;
    return (
      <>
        <Container fluid className="mt--5">
          <Row>
            <Col>
              <Card>
                { (title || showHelper) &&
                  <CardHeader>
                    <h2 className="mx-auto text-center display-3">{title}</h2>
                    {(showHelper) && (
                      <p style={{ position: "absolute", fontSize: "22px", top: "15px", right: "25px" }}>
                        <i className="fa fa-question-circle-o" aria-hidden="true"></i>
                      </p>
                    )}
                  </CardHeader>
                }
                <CardBody>
                  <Row>
                    <Col className="m-0">{children}</Col>
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
