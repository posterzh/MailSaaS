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
      sendingAddressName: "",
      leadAddressName: "",
      leadConditions: [],
      operator: false,
    };
  }

  async componentDidMount() {
    this.props.getMailAccounts();

    let detailsSettings = await this.props.getDetailsSettings(this.props.id);

    this.setState({
      sendingAddressId: detailsSettings.from_address,
      leadAddressId: detailsSettings.from_address
    })
  }

  componentWillReceiveProps(preProps, nextProps) {

  }

  onSendingAddressChange = (e) => {
    this.setState({
      sendingAddressId: e.target.value
    })
  }

  onLeadAddressChange = (e) => {
    this.setState({
      leadAddressId: e.target.value
    })
  }

  onAddCondition = () => {
    this.setState({
      leadConditions: [...this.state.leadConditions, { recipient: 0, times: 1 }]
    })
  }

  onDeleteCondition = (index) => {
    var leadConditions = [...this.state.leadConditions];
    leadConditions.splice(index, 1);
    this.setState({ leadConditions });
  }

  onToggleOperator = () => {
    this.setState({operator: !this.state.operator});
  }

  render() {
    const { sendingAddressId, leadAddressId, leadConditions } = this.state;
    const { id, title, mailAccounts } = this.props;
    const campTitle = title ? title : "Date Outreach";

    const activeSendingAddress = mailAccounts.find((m) => m.id == sendingAddressId);
    const activeSendingName = activeSendingAddress ?
      `${activeSendingAddress.first_name} ${activeSendingAddress.last_name}` : "";

    const activeLeadAddress = mailAccounts.find((m) => m.id == leadAddressId);
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
                  {/* <FormGroup>
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
                  </FormGroup> */}

                  <label className="form-control-label">
                    {
                      leadConditions && leadConditions.length == 0
                        ?
                        "Lead catching is disable."
                        :
                        "When does a recipient become a lead?"
                    }
                  </label>

                  {
                    leadConditions.map((leadCondition, index) => (
                      <>
                        {index == 0 ||
                          <div>
                            <Button color="secondary mb-3" type="button" size="sm" onClick={this.onToggleOperator}>
                              { this.state.operator ? "OR" : "ADD" }
                            </Button>
                          </div>
                        }
                        <div key={`item_${index}`} className="d-flex flex-row">
                          <FormGroup className="mr-2 mb-3">
                            <label style={{ fontSize: 11 }}>
                              Recipient
                            </label>
                            <Input type="select" className="form-control-sm" defaultValue={leadCondition.recipient}>
                              <option>Replies</option>
                              <option>Opens</option>
                              <option>Clicks any link</option>
                              <option>Clicks specific link</option>
                            </Input>
                          </FormGroup>
                          <FormGroup className="mr-2 mb-3">
                            <label style={{ fontSize: 11 }}>
                              # of times
                            </label>
                            <Input type="text" className="form-control-sm" defaultValue={leadCondition.times} />
                          </FormGroup>
                          <FormGroup className="d-flex flex-column justify-content-end mb-3">
                            <Button className="mb-1" color="danger" type="button" size="sm"
                              onClick={() => { this.onDeleteCondition(index) }}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </Button>
                          </FormGroup>
                        </div>
                      </>
                    ))
                  }

                  <div>
                    <Button outline color="secondary mb-3" type="button" size="sm" onClick={this.onAddCondition}>
                      {
                        leadConditions && leadConditions.length == 0
                          ?
                          "+ Add condition"
                          :
                          "+ Add another condition"
                      }
                    </Button>
                  </div>

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
