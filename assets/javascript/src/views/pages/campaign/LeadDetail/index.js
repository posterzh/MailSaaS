import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardText,
  Container,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";

class LeadDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    const campTitle = "Lead Detail";

    return (
      <>
        <PageHeader
          current={campTitle}
          parent="Leads"
          showStatus={false}
        />
        <PageContainer title={campTitle} showHelper={false}>
          <Container fluid>
            <Row>
              <Col md={{ size: 8, offset: 2 }}>
                <div
                  className="timeline timeline-one-side lead-timeline"
                  data-timeline-axis-style="dashed"
                  data-timeline-content="axis"
                >
                  <div className="timeline-block">
                    <span className="timeline-step badge-success">
                      <i className="fas fa-exclamation" />
                    </span>
                    <div className="timeline-content">
                      <div>
                        <span className="font-weight-bold">Lead Opened</span>
                        <small className="text-muted ml-2">
                          10:30 AM
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-block">
                    <span className="timeline-step badge-secondary">
                      <i className="fas fa-comment-dots" />
                    </span>
                    <div className="timeline-content">
                      <div>
                        <span className="font-weight-bold">Replied</span>
                        <small className="text-muted ml-2">
                          10:30 AM
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-block">
                    <span className="timeline-step badge-secondary" data-badge="3">
                      <i className="fas fa-mouse-pointer" />
                    </span>
                    <div className="timeline-content">
                      <div>
                        <span className="font-weight-bold">Clicked</span>
                        <small className="text-muted ml-2">
                          10:30 AM
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-block">
                    <span className="timeline-step badge-secondary">
                      <i className="fas fa-eye" />
                    </span>
                    <div className="timeline-content">
                      <div>
                        <span className="font-weight-bold">Opened</span>
                        <small className="text-muted ml-2">
                          10:30 AM
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="timeline-block">
                    <span className="timeline-step badge-default">
                      <i className="ni ni-send" />
                    </span>
                    <div className="timeline-content">
                      <div>
                        <span className="font-weight-bold">Sent</span>
                        <small className="text-muted ml-2">
                          10:30 AM
                        </small>
                      </div>
                      <Card className="lead-initial-email mt-3">
                        <CardHeader className="p-3">
                          <label>From:</label><span><strong>Omaid Faizyar</strong> omaidfaizyar@gmail.com</span><br />
                          <label>Subject:</label><span><strong>tesfy6tdtryh</strong></span>
                        </CardHeader>

                        <CardBody className="p-3">
                          <CardText className="">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Facilis non dolore est fuga nobis ipsum illum eligendi nemo
                            iure repellat, soluta, optio minus ut reiciendis voluptates
                            enim impedit veritatis officiis.
                          </CardText>
                        </CardBody>
                      </Card>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, {
})(LeadDetail);
