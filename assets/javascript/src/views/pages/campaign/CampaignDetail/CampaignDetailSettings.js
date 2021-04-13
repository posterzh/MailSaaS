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
import { getDetailsSettings, getLeadSettings, updateLeadSettings, updateSendingAddress } from "../../../../redux/action/CampaignDetailsActions"
import { showNotification } from "../../../../utils/Utils";
import { CAMPAIGN_LEAD_CATCHER_ITEM_TYPE } from "../../../../utils/Common";
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

    try {
      const detailsSettings = await this.props.getDetailsSettings(this.props.id);
      this.setState({
        sendingAddressId: detailsSettings.from_address,
        leadAddressId: detailsSettings.from_address
      })

      const leadSettings = await this.props.getLeadSettings(this.props.id);
      if (leadSettings && leadSettings.length > 0) {
        const item = leadSettings[0]
        const conditions = [];
        for (let field in CAMPAIGN_LEAD_CATCHER_ITEM_TYPE) {
          if (item[field]) {
            conditions.push({
              action: field,
              times: item[field]
            })
          }
        }
        this.setState({
          leadConditions: [
            ...conditions
          ],
          operator: item.join_operator == 'or',
        })
      }
    } catch (error) {}

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
      leadConditions: [...this.state.leadConditions, { action: "replies", times: 1 }]
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

  saveSendingAccount = () => {
    const { id } = this.props;
    const { sendingAddressId } = this.state;

    if (!sendingAddressId) {
      showNotification("warning", null, "Please select the sending account.");
      return;
    }

    this.props.updateSendingAddress(id, sendingAddressId);
  }

  onClickSaveLeadCatcher = async () => {
    const { leadConditions, operator } = this.state;
    const payload = {};

    // Validate input
    leadConditions.forEach(item => {
      payload[item.action] = item.times;
    })
    if (Object.keys(payload).length < leadConditions.length) {
      showNotification("danger", "Invalid content", "There are multiple items for the same action.");
      return;
    }
    const negativeValues = leadConditions.filter(item => item.times <= 0);
    if (negativeValues.length) {
      showNotification("danger", "Invalid content", "Number of times must be positive.");
      return;
    }

    console.log(payload);

    // Call API
    payload['join_operator'] = operator ? 'or' : 'and';
    try {
      await this.props.updateLeadSettings(this.props.id, payload)
    } catch (e) {
    }
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
            <Col md={6}>
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
                      <option value={""}>Select</option>
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
                      <Button color="danger" size="sm" onClick={this.saveSendingAccount}>&nbsp;&nbsp;SAVE&nbsp;&nbsp;</Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <CardHeader>
                  <h3 className="mb-0">Lead Catcher</h3>
                </CardHeader>
                <CardBody>
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
                      <div key={`${index}`}>
                        {index == 0 ||
                          <div>
                            <Button color="secondary mb-3" type="button" size="sm" onClick={this.onToggleOperator}>
                              { this.state.operator ? "OR" : "AND" }
                            </Button>
                          </div>
                        }
                        <div key={`item_${index}`} className="d-flex flex-row">
                          <FormGroup className="mr-2 mb-3">
                            <label style={{ fontSize: 11 }}>
                              Recipient
                            </label>
                            <Input type="select" className="form-control-sm" value={leadCondition.action} onChange={e => {
                              leadCondition.action = e.target.value;
                              this.setState({
                                leadConditions: [...leadConditions]
                              })
                            }}>
                              {
                                Object.keys(CAMPAIGN_LEAD_CATCHER_ITEM_TYPE).map((item, index1) => {
                                  return <option key={index1} value={item}>{CAMPAIGN_LEAD_CATCHER_ITEM_TYPE[item]}</option>;
                                })
                              }
                            </Input>
                          </FormGroup>
                          <FormGroup className="mr-2 mb-3">
                            <label style={{ fontSize: 11 }}>
                              # of times
                            </label>
                            <Input type="number" className="form-control-sm" value={leadCondition.times} onChange={e => {
                              leadCondition.times = e.target.value;
                              this.setState({
                                leadConditions: [...leadConditions]
                              })
                            }} />
                          </FormGroup>
                          <FormGroup className="d-flex flex-column justify-content-end mb-3">
                            <Button className="mb-1" color="danger" type="button" size="sm"
                              onClick={() => { this.onDeleteCondition(index) }}
                            >
                              <i className="fa fa-trash" aria-hidden="true"></i>
                            </Button>
                          </FormGroup>
                        </div>
                      </div>
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
                      <Button color="danger" size="sm" onClick={this.onClickSaveLeadCatcher}>&nbsp;&nbsp;SAVE&nbsp;&nbsp;</Button>
                    </Col>
                    {/* <Col>
                      <Button color="secondary" size="sm">CANCEL</Button>
                    </Col> */}
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
  getLeadSettings,
  updateLeadSettings,
  updateSendingAddress,
  getMailAccounts
})(CampaignDetailSettings);
