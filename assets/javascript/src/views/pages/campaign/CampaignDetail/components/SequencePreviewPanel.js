import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  Table,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Input,
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody
} from "reactstrap";
import PreviewPanelList from "./PreviewPanelList";
import MainPreviewPanel from "./MainPreviewPanel";
import FollowUpPreviewPanel from "./FollowUpPreviewPanel";
import DripPreviewPanel from "./DripPreviewPanel";

class SequencePreviewPanel extends Component {
  constructor(props) {
    super(props);

    const { detailsSequence: { followups, drips } } = props;

    this.state = {
      followUpList: followups,
      dripList: drips,
    }
  }

  componentDidMount() {

  }

  render() {
    const { detailsSequence } = this.props;

    return (
      <>
        <Row className="my-3">
          <Col md={12} className="mx-auto text-right">
            <Button type="button" color="danger" className="mx-auto" size="sm" onClick={this.onEdit}>
              EDIT SEQUENCE
            </Button>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader className="bg-transparent py-2">
                <h3 className="mb-0">Initial campaign email</h3>
              </CardHeader>
              <CardBody className="py-2">
                <PreviewPanelList>
                  <MainPreviewPanel subject={detailsSequence.email_subject} body={detailsSequence.email_body} />
                </PreviewPanelList>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <CardHeader className="bg-transparent py-2">
                <h3 className="mb-0">Follow-Ups</h3>
              </CardHeader>
              <CardBody className="py-2">
                <PreviewPanelList>
                  {detailsSequence.followups && (
                    detailsSequence.followups.map(followup => (
                      <FollowUpPreviewPanel subject={followup.subject} body={followup.email_body} waitDays={followup.waitDays} />
                    ))
                  )}
                </PreviewPanelList>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader className="bg-transparent py-2">
                <h3 className="mb-0">Drips</h3>
              </CardHeader>
              <CardBody className="py-2">
                <PreviewPanelList>
                  {detailsSequence.drips && (
                    detailsSequence.drips.map(drip => (
                      <DripPreviewPanel subject={drip.subject} body={drip.email_body} waitDays={drip.waitDays} />
                    ))
                  )}
                </PreviewPanelList>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.campaignDetails.id,
  title: state.campaignDetails.title,
  detailsSequence: state.campaignDetails.detailsSequence,
});

export default connect(mapStateToProps)(SequencePreviewPanel);
