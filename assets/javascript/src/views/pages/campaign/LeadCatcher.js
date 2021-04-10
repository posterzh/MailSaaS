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
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from 'reactstrap'
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "../../../components/Tables";
import FloatingPanel from "../../../components/FloatingPanel";
import { toggleTopLoader, toastOnError, messages } from '../../../utils/Utils';
import axios from '../../../utils/axios';
import moment from "moment";

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
      detailData: null
    }
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
      detailData: null
    })
    try {
      toggleTopLoader(true);
      const { data: {success, content} } = await axios.get(`/campaign/lead-detail/${camp_id}/${lead_id}/`);
      if (success) {
        this.setState({
          detailData: content
        })
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
      case 'reopen':    { return "ni ni-send"; }
      case 'won':       { return "ni ni-send"; }
      case 'lost':      { return "ni ni-send"; }
      case 'ignored':   { return "ni ni-send"; }
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
      case 'reopen':    { return "badge-secondary"; }
      case 'won':       { return "badge-secondary"; }
      case 'lost':      { return "badge-secondary"; }
      case 'ignored':   { return "badge-secondary"; }
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
      case 'reopen':    { return "Lead reopened"; }
      case 'won':       { return "Lead won"; }
      case 'lost':      { return "Lead lost"; }
      case 'ignored':   { return "Lead ignored"; }
      default:          { return ""; }
    }
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

    const { filters, data, detailLeadId, detailData, detailPanelVisible, detailLoading } = this.state;
    let detailLead = null;
    if (detailLeadId) {
      detailLead = data.filter(item => item.id == detailLeadId)
      if (detailLead.length > 0) {
        detailLead = detailLead[0];
      }
    }

    let timeline = [];
    if (detailPanelVisible && detailData) {
      if (detailData.logs) {
        timeline = [...detailData.logs];
      }

      timeline.push({
        lead_action: 'sent',
        created_date_time: moment(detailData.sent_date + " " + detailData.sent_time),
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
                  <Spinner color="primary" />
                }
                {
                  !detailLoading && timeline.length === 0 &&
                  <p className="text-muted text-center mb-0">Lead detail data doesn't exist for this lead.</p>
                }
                {
                  !detailLoading && !!timeline.length &&
                  <>
                    <div className="d-flex justify-content-center align-items-center">
                      <Button className="btn-icon" color="warning" type="button" size="sm">
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
                          <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                            Open
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                            Replied
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                            Won
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                            Lost
                          </DropdownItem>
                          <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                            Ignored
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      <UncontrolledDropdown size="sm">
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
                      </UncontrolledDropdown>
                      <Button className="btn-icon" color="secondary" type="button" size="sm">
                        <span className="btn-inner--icon">
                          <i className="ni ni-curved-next" />
                        </span>
                        <span className="btn-inner--text">NEXT</span>
                      </Button>
                    </div>
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
                                  item.lead_action === 'sent' && detailData &&
                                  <Card className="lead-initial-email mt-3">
                                    <CardHeader className="p-3">
                                      <label>From:</label><span><strong>{this.getFullName(detailData.from_first_name, detailData.from_last_name)}</strong> {detailData.from_email_addr}</span><br />
                                      <label>Subject:</label><span><strong>{ detailData.email_subject }</strong></span>
                                    </CardHeader>

                                    <CardBody className="p-3">
                                      <div dangerouslySetInnerHTML={{__html: detailData.email_body}}>
                                      </div>
                                    </CardBody>
                                  </Card>
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
