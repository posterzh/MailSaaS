import React, { Component } from 'react'
import LeadCatchermodel from "./components/LeadCatchermodel"
import { connect } from 'react-redux'
import { CampaignLeadViewAction, CampaignOverviewAction } from "../../../redux/action/CampaignAction";
import { 
  Container,
  Button,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  Input,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap'
import moment from "moment";
import ReactQuill from "react-quill";
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "../../../components/Tables";
import { formatHeader, toggleTopLoader, toastOnSuccess, toastOnError, messages } from '../../../utils/Utils';
import axios from '../../../utils/axios';

class LeadCatcher extends Component {
  constructor() {
    super()
    this.state = {
      filters: [
        {
          key: 'lead_status',
          label: 'Lead Status',
          options: ['open', 'replied', 'won', 'lost', 'ignored']
        },
        {
          key: 'campaign_title',
          label: 'Campaign',
          options: []
        }
      ],
      modal: false,
      data: [],
      detailLoading: false,
      detailPanelVisible: false,
      detailLeadId: null,
      detailData: null,
      detailReplyEnable: false,
      detailReplySubject: '',
      detailReplyBody: '',
      detailReplyProgress: false,
    }
  }

  _emailBodyQuill = {
    ref: null
  }

  async componentDidMount() {
    // this.props.CampaignLeadViewAction()
    try {
      toggleTopLoader(true);
      const { data } = await axios.get("/campaign/leads/");
      if (data.success) {
        const { filters } = this.state;

        filters[1].options = []
        const camp_ids = []
        for (let item of data.res) {
          if (camp_ids.indexOf(item.camp_id) === -1) {
            camp_ids.push(item.camp_id)
            filters[1].options.push(item.campaign_title)
          }
        }

        this.setState({
          data: data.res.map(item => {
            item.opened = moment(item.update_date_time).format('MMM DD, YYYY')
            return item;
          }),
          filters: [
            ...filters
          ]
        })
      }
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
  }

  showDetails = async (data) => {
    // this.props.history.push(`/app/admin/lead/detail/${data.camp_id}/${data.id}`);
    const { camp_id, id: lead_id } = data

    // Get campaign detail
    this.setState({
      detailLoading: true,
      detailPanelVisible: true,
      detailLeadId: lead_id,
      detailData: null,
      detailReplyEnable: false,
      detailReplySubject: '',
      detailReplyBody: '',
    })
    try {
      toggleTopLoader(true);
      const { data: {success, content} } = await axios.get(`/campaign/lead-detail/${camp_id}/${lead_id}/`);
      if (success) {
        this.setState({
          detailData: content
        })
      } else {
        toastOnError("Failed to fetch lead detail.");
      }
    } catch (e) {
      toastOnError(messages.api_failed);

      this.setState({
        detailPanelVisible: false,
        detailLeadId: null
      })
    } finally {
      toggleTopLoader(false);
      this.setState({
        detailLoading: false
      })
    }
  }

  hideDetails = () => {
    this.setState({
      detailPanelVisible: false,
      detailData: null,
      detailLeadId: null
    })
  }

  showDetailByID = (lead_id) => {
    const { data } = this.state;
    const detailData = data.filter(item => item.id == lead_id);
    if (!detailData.length) {
      return false;
    }
    this.showDetails(detailData[0]);
  }

  updateLeadStatus = async (lead, status) => {
    const { camp_id, id: lead_id } = lead
    try {
      toggleTopLoader(true);

      this.cancelReplyLead();

      const { data: {success, content} } = await axios.post(`/campaign/lead/status/${lead_id}/`, {status});
      if (success) {
        const { detailData, data } = this.state;

        // Add log
        if (content && content.log) {
          this.setState({
            detailData: {
              ...detailData,
              logs: [
                ...detailData.logs || [],
                content.log
              ]
            }
          })
        }

        // Update lead status
        let lead_status = status;
        if (status === 'reopen') {
          lead_status = 'open'
        }
        this.setState({
          data: [
            ...data.map(item => {
              if (item.id == lead_id) {
                item.lead_status = lead_status
              }
              return item;
            })
          ]
        })
      } else {
        toastOnError("Failed to update lead status.");
      }
    } catch (e) {
      console.log(e);
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }

  replyLead = () => {
    this.setState({
      detailReplyEnable: true,
      detailReplySubject: '',
      detailReplyBody: '',
    })
  }

  cancelReplyLead = () => {
    this.setState({
      detailReplyEnable: false,
      detailReplySubject: '',
      detailReplyBody: '',
    })
  }

  getFullName = (first_name, last_name) => {
    const arr = [];
    if (first_name) arr.push(first_name)
    if (last_name) arr.push(last_name)
    return arr.join(" ");
  }

  getLogIcon = ({lead_action}) => {
    switch(lead_action) {
      case 'opened':    { return "fas fa-eye"; }
      case 'clicked':   { return "fas fa-mouse-pointer"; }
      case 'replied':   { return "fas fa-comment-dots"; }
      case 'sent':      { return "ni ni-send"; }
      case 'me_replied':{ return "ni ni-send"; }
      case 'open':      { return "fas fa-exclamation"; }
      case 'won':       { return "fas fa-thumbs-up"; }
      case 'lost':      { return "fas fa-thumbs-down"; }
      case 'ignored':   { return "fas fa-ban"; }
      default:          { return "ni ni-send"; }
    }
  }

  getLogBadgeClass = ({lead_action}) => {
    switch(lead_action) {
      case 'opened':    { return "badge-secondary"; }
      case 'clicked':   { return "badge-secondary"; }
      case 'replied':   { return "badge-secondary"; }
      case 'sent':      { return "badge-default"; }
      case 'me_replied':{ return "badge-default"; }
      case 'open':      { return "badge-success"; }
      case 'won':       { return "badge-warning"; }
      case 'lost':      { return "badge-light"; }
      case 'ignored':   { return "badge-light"; }
      default:          { return "badge-secondary"; }
    }
  }

  getLogLabel = ({lead_action}) => {
    switch(lead_action) {
      case 'opened':    { return "Opened"; }
      case 'clicked':   { return "Clicked"; }
      case 'replied':   { return "Replied"; }
      case 'sent':      { return "Sent"; }
      case 'me_replied':{ return "You replied"; }
      case 'open':      { return "Lead opened"; }
      case 'won':       { return "Lead won"; }
      case 'lost':      { return "Lead lost"; }
      case 'ignored':   { return "Lead ignored"; }
      default:          { return ""; }
    }
  }

  isLeadOpen = ({lead_status}) => {
    return lead_status === 'open'
  }

  handleRely = async (e) => {
    e.preventDefault();
    const { data, detailLeadId, detailReplySubject, detailReplyBody, detailData } = this.state;
    let detailLead = null;
    if (detailLeadId) {
      detailLead = data.filter(item => item.id == detailLeadId)
      if (detailLead.length > 0) {
        detailLead = detailLead[0];
      }
    }

    const { camp_id, id: lead_id } = detailLead

    try {
      toggleTopLoader(true);
      this.setState({
        detailReplyProgress: true
      })

      const { data: {success, content} } = await axios.post(`/campaign/lead/reply/${camp_id}/${lead_id}/`, {
        subject: detailReplySubject,
        body: detailReplyBody
      });
      if (success) {
        // Add log
        if (content && content.log) {
          this.setState({
            detailData: {
              ...detailData,
              logs: [
                ...detailData.logs || [],
                content.log
              ]
            }
          })
        }

        toastOnSuccess("Email sent successfully!");
      } else {
        toastOnError("Failed to reply.");
      }
    } catch (err) {
      console.log(err);
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
      this.setState({
        detailReplyProgress: false,
        detailReplyEnable: false
      })
    }
  }

  renderEmail = ({lead_action, inbox, outbox}) => {
    let email = {};
    const { detailData, detailLeadId, data } = this.state;
    if (lead_action === 'sent' || lead_action === 'me_replied') {
      email = {
        ...outbox,
          from_fullname: this.getFullName(detailData.from_first_name, detailData.from_last_name),
          from_addr: detailData.from_email_addr
      }
    } else if (lead_action === 'replied') {
      let detailLead = {};
      if (detailLeadId) {
        detailLead = data.filter(item => item.id == detailLeadId)
        if (detailLead.length > 0) {
          detailLead = detailLead[0];
        }
      }
      email = {
        ...inbox,
        from_fullname: detailLead.full_name,
        from_addr: detailLead.email,
      }
    } else {
      return null;
    }
    return (
      <Card className="lead-initial-email mt-3 mb-0">
        <CardHeader className="p-3">
          <label>From:</label>
          <span>
            {!email.from_fullname || <strong>{email.from_fullname} </strong>}
            {email.from_addr}
          </span><br />
          <label>Subject:</label><span><strong>{ email.email_subject }</strong></span>
        </CardHeader>

        <CardBody className="p-3">
          <div dangerouslySetInnerHTML={{__html: email.email_body}}>
          </div>
        </CardBody>
      </Card>
    )
  }

  getDNDSource = (keys) => {
    return (
      <div className="d-flex flex-wrap mt-2">
        {
          keys.map((field, index) => {
            return (
              <div className="keyword-item text-danger px-1 mr-2 my-1" key={`template ${index}`} draggable="true" onDragStart={(e) => {
                const dataTransfer = e.dataTransfer;
                dataTransfer.setData('text/html', `<span class="keyword-item p-1 mr-2 my-1">{{${field}}}</span>`);
                dataTransfer.setData('text', `{{${field}}}`);
              }} onDoubleClick={() => {
                const { ref: _quillRef } = this._emailBodyQuill;
                if (_quillRef) {
                  const currentLen = _quillRef.getEditor().getLength();
                  _quillRef.getEditor().insertText(currentLen - 1, `{{${field}}}`)
                }
              }}>
                <i className="fas fa-bars text-danger mr-1"></i>
                { formatHeader(field) }
              </div>
            )
          })
        } 
      </div>
    )
  }

  getNextDetailId = () => {
    const { data, detailLeadId } = this.state;
    let nextId = null;
    // TODO: use filtered data instead of 'data'
    const items = data || [];
    for (let i = 0 ; i < items.length - 1 ; i ++) {
      if (items[i].id == detailLeadId) {
        nextId = items[i+1].id;
        break;
      }
    }
    return nextId;
  }

  getPrevDetailId = () => {
    const { data, detailLeadId } = this.state;
    let nextId = null;
    // TODO: use filtered data instead of 'data'
    const items = data || [];
    for (let i = 1 ; i < items.length ; i ++) {
      if (items[i].id == detailLeadId) {
        nextId = items[i-1].id;
        break;
      }
    }
    return nextId;
  }

  render() {
    const tableTitle = [
      {
        key: 'email',
        value: 'Email',
      },
      {
        key: 'campaign_title',
        value: 'Campaign',
      },
      {
        key: 'assigned_name',
        value: 'Assigned',
      },
      {
        key: 'lead_status',
        value: 'Lead Status',
      },
      {
        key: 'opened',
        value: 'Opened'
      }
    ];

    const { filters, data, detailLeadId, detailData, detailPanelVisible, detailLoading,
      detailReplyEnable, detailReplySubject, detailReplyBody, detailReplyProgress } = this.state;
    let detailLead = null;
    if (detailLeadId) {
      detailLead = data.filter(item => item.id == detailLeadId)
      if (detailLead.length > 0) {
        detailLead = detailLead[0];
      }
    }

    let timeline = [];
    let DNDkeys = [];
    if (detailPanelVisible && detailData) {
      if (detailData.logs) {
        timeline = [...detailData.logs];
      }

      timeline.push({
        lead_action: 'sent',
        created_date_time: moment(detailData.sent_date + " " + detailData.sent_time),
        outbox: {
          email_subject: detailData.email_subject,
          email_body: detailData.email_body
        }
      })
      timeline.sort((a, b) => {
        const ma = moment(a.created_date_time);
        const mb = moment(b.created_date_time);
        if (ma.isAfter(mb)) return 1;
        if (ma.isBefore(mb)) return -1;
        return 0;
      })

      const tmp = timeline;
      tmp.push({})
      timeline = [];
      for (let i = 0, series_cnt = 0 ; i < tmp.length - 1 ; i ++) {
        const item = tmp[i];
        let duplicated = false;
        if (item.lead_action === tmp[i+1].lead_action) {
          if (item.lead_action === 'opened' || item.lead_action === 'clicked') {
            duplicated = true;
            series_cnt ++;
          }
        }
        if (!duplicated) {
          if (series_cnt > 0) {
            item.badge_cnt = series_cnt + 1;
          }
          timeline.push(item);
          series_cnt = 0;
        }
      }

      try {
        const replacement = JSON.parse(detailLead.replacement);
        DNDkeys = Object.keys(replacement);
      } catch (e) {
        DNDkeys = []
      }
    }

    return (
      <>
        <PageHeader
          current="Leads"
          parent="Campaign"
          showStatus={false}
        />
        <PageContainer title="Leads" showHelper={true}>
          <Container fluid>
            <Row>
              <Tables
                titles={tableTitle} // required
                tablePropsData={this.state.data}   // required
                showAction={true}    // optional
                showSelect={true}    // optional
                showPagination={true}   // optional
                filters={filters}   // optional to enable filter
                searchKeys={['email', 'campaign_title']}  // optional to enable search
                onClick={this.showDetails}
              />
            </Row>
          </Container>
          <Modal isOpen={detailPanelVisible} toggle={this.hideDetails} size="lg" className="lead-detail-modal">
            <ModalHeader toggle={this.hideDetails}>{!!detailLead && detailLead.email}</ModalHeader>
            <ModalBody className="pt-0">
              <div className="px-0 px-sm-5">
                {
                  detailLoading &&
                  <div className="d-flex">
                    <Spinner color="primary" className="m-auto"/>
                  </div>
                }
                {
                  !detailLoading && timeline.length === 0 &&
                  <p className="text-muted text-center mb-0">Lead detail data doesn't exist for this lead.</p>
                }

                {
                  !detailLoading && !!timeline.length &&
                  <>
                    <div className="d-flex justify-content-center align-items-center">
                      {
                        this.isLeadOpen(detailLead) ?
                        <>
                          <Button className="btn-icon" color="danger" type="button" size="sm" onClick={this.replyLead} disabled={detailReplyEnable}>
                            <span className="btn-inner--icon">
                              <i className="ni ni-chat-round" />
                            </span>
                            <span className="btn-inner--text">REPLY</span>
                          </Button>
                          <UncontrolledDropdown size="sm">
                            <DropdownToggle caret color="secondary">
                              STATUS
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem onClick={e => this.updateLeadStatus(detailLead, 'won')}>
                                Won
                              </DropdownItem>
                              <DropdownItem onClick={e => this.updateLeadStatus(detailLead, 'lost')}>
                                Lost
                              </DropdownItem>
                              <DropdownItem onClick={e => this.updateLeadStatus(detailLead, 'ignored')}>
                                Ignore
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                          {/* <UncontrolledDropdown size="sm">
                            <DropdownToggle caret color="secondary">
                              ASSIGN
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                                Unassigned
                              </DropdownItem>
                              <DropdownItem href="#pablo" disabled onClick={e => e.preventDefault()}>
                                Me
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown> */}
                        </>
                        :
                        <Button color="secondary" type="button" size="sm" onClick={e => this.updateLeadStatus(detailLead, 'reopen')}>
                          RE-OPEN
                        </Button>
                      }
                      <Button className="btn-icon" color="secondary" type="button" size="sm"
                        disabled={!this.getPrevDetailId()} onClick={() => this.showDetailByID(this.getPrevDetailId())}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-curved-next" style={{transform: 'scaleX(-1)'}} />
                        </span>
                        <span className="btn-inner--text">PREV</span>
                      </Button>
                      <Button className="btn-icon" color="secondary" type="button" size="sm"
                        disabled={!this.getNextDetailId()} onClick={() => this.showDetailByID(this.getNextDetailId())}>
                        <span className="btn-inner--icon">
                          <i className="ni ni-curved-next" />
                        </span>
                        <span className="btn-inner--text">NEXT</span>
                      </Button>
                    </div>

                    {
                      !detailReplyEnable ||
                      <Form onSubmit={this.handleRely} className="reply-container my-3">
                        <Input
                          type="text"
                          className="form-control"
                          name="subject"
                          value={detailReplySubject}
                          onChange={(e) => {
                            this.setState({ detailReplySubject: e.target.value });
                          }}
                          size="sm"
                          placeholder="Subject"
                          required
                        />
                        <ReactQuill
                          ref={ref => this._emailBodyQuill['ref'] = ref}
                          onChange={(value) => {
                            this.setState({ detailReplyBody: value });
                          }}
                          theme="snow"
                          className="Quill_div mt-1"
                          modules={{
                            toolbar: [
                              ["bold", "italic"],
                              ["link", "blockquote", "code", "image"],
                              [
                                {
                                  list: "ordered",
                                },
                                {
                                  list: "bullet",
                                },
                              ],
                            ],
                          }}
                        />
                        {this.getDNDSource(DNDkeys)}
                        <div className="mt-1 d-flex justify-content-end align-items-center">
                          <Button color="danger" type="submit" size="sm" disabled={detailReplyProgress}>
                            SEND
                          </Button>
                          <Button color="secondary" type="button" size="sm" onClick={this.cancelReplyLead}>
                            CANCEL
                          </Button>
                        </div>
                      </Form>
                    }

                    <div className="timeline timeline-one-side lead-timeline pt-4"
                      data-timeline-axis-style="dashed"
                      data-timeline-content="axis">
                      {
                        timeline.reverse().map((item, index) => {
                          return (
                            <div className="timeline-block" key={`${index}`}>
                              <span className={`timeline-step ${this.getLogBadgeClass(item)} ${item.badge_cnt > 1 && 'has-badge'}`} data-badge={item.badge_cnt}>
                                <i className={this.getLogIcon(item)} />
                              </span>
                              <div className="timeline-content">
                                <div>
                                  <span className="font-weight-bold">{this.getLogLabel(item)}</span>
                                  <small className="text-muted ml-2">
                                    {moment(item.created_date_time).format('MMM DD, YYYY hh:mm a')}
                                  </small>
                                </div>
                                {
                                  this.renderEmail(item)
                                }
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </>
                }
              </div>
            </ModalBody>
          </Modal>
        </PageContainer>
      </>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("state", state.LeadViewReducer && state.LeadViewReducer.leadViewData)
  return {
    leadData: state.LeadViewReducer && state.LeadViewReducer.leadViewData
  };
};
const mapDispatchToProps = (dispatch) => ({
  // CampaignLeadGetAction:()=>dispatch(CampaignLeadGetAction)
  CampaignLeadViewAction: () => dispatch(CampaignLeadViewAction())

});
export default connect(mapStateToProps, mapDispatchToProps)(LeadCatcher)
