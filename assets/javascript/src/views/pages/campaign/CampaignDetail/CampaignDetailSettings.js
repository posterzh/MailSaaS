import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Input,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Card,
  CardHeader,
  CardBody,
} from "reactstrap";
import { getMailAccounts } from "../../../../redux/action/MailAccountsActions"
import { getDetailsSettings } from "../../../../redux/action/CampaignDetailsActions"
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";

export class CampaignDetailSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingAddressId: "",
      leadAddressId: "",
    };
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.getDetailsSettings(this.props.id);
    this.props.getMailAccounts();
    this.setState({
      sendingAddressId: id,
      leadAddressId: id,
    })
  }

  componentWillReceiveProps(preProps, nextProps) {

  }

  onSendingAddressChange = (e) => {
    this.setState({ sendingAddressId: e.target.value })
  }

  onLeadAddressChange = (e) => {
    this.setState({ leadAddressId: e.target.value })
  }

  render() {
    const { sendingAddressId, leadAddressId } = this.state;
    const { id, title, mailAccounts } = this.props;
    const campTitle = title ? title : "Date Outreach";

    const activeSendingAddress = mailAccounts.find((m) => m.id == sendingAddressId);
    const activeLeadAddress = mailAccounts.find((m) => m.id == leadAddressId);

    const activeSendingName = activeSendingAddress ?
      `${activeSendingAddress.first_name} ${activeSendingAddress.last_name}` : "";
    const activeLeadName = activeLeadAddress ?
      `${activeLeadAddress.first_name} ${activeLeadAddress.last_name}` : "";

    return (
      <>
        <PageHeader
          current={campTitle}
          parent="Campaign Details"
          showStatus={false}
        />

        <PageContainer title={campTitle} showHelper={true}>
          <Row>
            <DetailHeader activeItem="SETTINGS" id={id} />
          </Row>

          <Row className="mx-3 my-5">
            <Col md={4}>
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Sending Account</h3>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="selectFromAddress"
                    >
                      From address
                    </label>
                    <Input
                      id="selectFromAddress"
                      type="select"
                      className="form-control-sm"
                      value={sendingAddressId}
                      onChange={this.onSendingAddressChange}
                    >
                      <option>Select</option>
                      {mailAccounts && mailAccounts.map((mailAccount, id) => (
                        <option key={`item_${id}`} value={mailAccount.id}>{mailAccount.email}</option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <label className="form-control-label">From name</label>
                    <Input type="text" className="form-control-sm" defaultValue={activeSendingName} />
                  </FormGroup>

                  <Row>
                    <Col>
                      <Button color="danger" size="sm">&nbsp;&nbsp;SAVE&nbsp;&nbsp;</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Lead Catcher</h3>
                </CardHeader>
                <CardBody>
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="selectFromAddress"
                    >
                      Who should leads be assigned to?
                    </label>
                    <Input
                      id="selectFromAddress"
                      type="select"
                      className="form-control-sm"
                      value={leadAddressId}
                      onChange={this.onLeadAddressChange}
                    >
                      <option>Select</option>
                      {mailAccounts && mailAccounts.map((mailAccount, id) => (
                        <option key={`item_${id}`} value={mailAccount.id}>{mailAccount.email}</option>
                      ))}
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <label className="form-control-label">
                      When does a recipient become a lead?
                    </label>
                    <Input type="text" className="form-control-sm" defaultValue={activeLeadName} />
                  </FormGroup>

                  <Row>
                    <Col>
                      <Button color="danger" size="sm">&nbsp;&nbsp;SAVE&nbsp;&nbsp;</Button>
                    </Col>
                    <Col>
                      <Button color="secondary" size="sm">CANCEL</Button>
                    </Col>
                    <Col></Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    id: state.campaignDetails.id,
    title: state.campaignDetails.title,
    mailAccounts: state.mailAccounts.mailAccounts,
  };
};

export default connect(mapStateToProps, {
  getDetailsSettings,
  getMailAccounts
})(CampaignDetailSettings);
