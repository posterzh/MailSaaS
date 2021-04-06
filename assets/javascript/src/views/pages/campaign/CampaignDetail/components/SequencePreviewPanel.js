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
  }

  componentDidMount() {

  }

  onEdit = () => {
    this.props.onEdit();
  }

  render() {
    const { detailsSequence } = this.props;

    const main = detailsSequence.emails ? detailsSequence.emails.find(e => e.email_type === 0) : undefined;
    const followups = detailsSequence.emails ? detailsSequence.emails.filter(e => e.email_type === 1) : [];
    const drips = detailsSequence.emails ? detailsSequence.emails.filter(e => e.email_type === 2) : [];

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
                  {
                    main &&
                    <MainPreviewPanel subject={main.email_subject} body={main.email_body} />
                  }
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
                  {followups && (
                    followups.map((followup, index) => (
                      <FollowUpPreviewPanel key={`item_${index}`} subject={followup.email_subject} body={followup.email_body} waitDays={followup.wait_days} />
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
                  {drips && (
                    drips.map((drip, index) => (
                      <DripPreviewPanel key={`item_${index}`} subject={drip.email_subject} body={drip.email_body} waitDays={drip.wait_days} />
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
