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
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import SequenceEditPanel from "./components/SequenceEditPanel";
import SequencePreviewPanel from "./components/SequencePreviewPanel";
import DetailHeader from "./components/DetailHeader";
import { getDetialsSequence } from "../../../../redux/action/CampaignDetailsActions";
import { showNotification } from "../../../../utils/Utils";

class CampaignDetailSequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    }
  }

  componentDidMount() {
    this.props.getDetialsSequence(this.props.id);
  }

  handleSubmit = () => {

  }

  onEdit = () => {
    this.setState({
      editing: true
    });
  }

  onSave = () => {
    this.setState({
      editing: false
    });
    this.props.getDetialsSequence(this.props.id);
  }

  onCancel = () => {
    this.setState({
      editing: false
    });
  }

  render() {
    const { editing } = this.state;
    const { id, title } = this.props;
    const campTitle = title ? title : "Date Outreach";

    return (
      <>
        <PageHeader
          current={campTitle}
          parent="Campaign Details"
          showStatus={false}
        />

        <PageContainer title={campTitle} showHelper={true}>
          <Row>
            <DetailHeader activeItem="SEQUENCE" id={id} />
          </Row>
          <Row className="mx-3">
            <Col md={12}>
            {editing
              ?
              <SequenceEditPanel onSave={this.onSave} onCancel={this.onCancel}/>
              :
              <SequencePreviewPanel onEdit={this.onEdit}/>
            }
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.campaignDetails.id,
  title: state.campaignDetails.title,
});

export default connect(mapStateToProps, {
  getDetialsSequence
})(CampaignDetailSequence);
