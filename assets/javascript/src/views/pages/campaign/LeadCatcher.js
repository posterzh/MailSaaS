import React, { Component } from 'react'
import LeadCatchermodel from "./components/LeadCatchermodel"
import { connect } from 'react-redux'
import { CampaignLeadViewAction, CampaignOverviewAction } from "../../../redux/action/CampaignAction";
import { Container, Row, Col, Card, CardHeader, CardBody, Spinner } from 'reactstrap'
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "../../../components/Tables";
import { toggleTopLoader, toastOnError, messages } from '../../../utils/Utils';
import axios from '../../../utils/axios';
import moment from "moment";

class LeadCatcher extends Component {
  constructor() {
    super()
    this.state = {
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
        this.setState({
          data: data.res.map(item => {
            item.opened = moment(item.update_date_time).format('MMM DD, YYYY')
            return item;
          })
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
      detailLeadId: lead_id
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
  getFullName = (first_name, last_name) => {
    const arr = [];
    if (first_name) arr.push(first_name)
    if (last_name) arr.push(last_name)
    return arr.join(" ");
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
    const filters = [
      {
        key: 'lead_status',
        options: ['open', 'replied', 'won', 'lost', 'ignored']
      }
    ];

    const { data, detailLeadId, detailData, detailPanelVisible, detailLoading } = this.state;
    let detailLead = null;
    if (detailLeadId) {
      detailLead = data.filter(item => item.id == detailLeadId)
      if (detailLead.length > 0) {
        detailLead = detailLead[0];
      }
    }
    const timeline = [];
    if (detailPanelVisible && detailData) {
      const data = detailData;
      timeline.push({
        type: 'sent',
        label: 'Sent',
        dt: moment(data.sent_date + " " + data.sent_time),
        icon: "ni ni-send",
        badge_class: "badge-default"
      })
      timeline.push({
        type: 'lead-opened',
        label: 'Lead Opened',
        dt: moment(),
        icon: "fas fa-exclamation",
        badge_class: "badge-success"
      })

      if (data.opened) {
        timeline.push({
          type: 'opened',
          label: 'Opened',
          dt: moment(data.opened_datetime),
          icon: "fas fa-eye",
          badge_class: "badge-secondary",
          badge_cnt: data.opened
        })
      }
      if (data.clicked) {
        timeline.push({
          type: 'clicked',
          label: 'Clicked',
          dt: moment(data.clicked_datetime),
          icon: "fas fa-mouse-pointer",
          badge_class: "badge-secondary",
          badge_cnt: data.clicked
        })
      }
      if (data.replied) {
        timeline.push({
          type: 'replied',
          label: 'Replied',
          dt: moment(data.reply_datetime),
          icon: "fas fa-comment-dots",
          badge_class: "badge-secondary",
          badge_cnt: data.replied
        })
      }
      timeline.sort((a, b) => {
        if (a.dt.isAfter(b.dt)) return -1;
        if (a.dt.isBefore(b.dt)) return 1;
        return 0;
      })
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
          <div className={`float-panel panel-right ${detailPanelVisible && 'show'}`}>
            <div className="panel-header">
              <h2 className="header-title">{!!detailLead && detailLead.email}</h2>
              <i className="fas fa-times btn-close" onClick={() => this.setState({detailPanelVisible: false, detailData: null, detailLeadId: null})}></i>
            </div>
            <div className="panel-body">
              {
                detailLoading &&
                <Spinner color="dark" />
              }
              <div className="timeline timeline-one-side lead-timeline"
                data-timeline-axis-style="dashed"
                data-timeline-content="axis">
                {
                  timeline.map((item, index) => {
                    return (
                      <div className="timeline-block" key={`${index}`}>
                        <span className={`timeline-step ${item.badge_class} ${item.badge_cnt > 1 && 'has-badge'}`} data-badge={item.badge_cnt}>
                          <i className={item.icon} />
                        </span>
                        <div className="timeline-content">
                          <div>
                            <span className="font-weight-bold">{item.label}</span>
                            <small className="text-muted ml-2">
                              {item.dt.format('MMM DD, YYYY hh:mm a')}
                            </small>
                          </div>
                          {
                            item.type === 'sent' && detailData &&
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
            </div>
          </div>
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
