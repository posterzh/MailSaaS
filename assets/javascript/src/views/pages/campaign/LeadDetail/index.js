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
import moment from 'moment';
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import { toggleTopLoader, toastOnError, messages } from '../../../../utils/Utils';
import axios from '../../../../utils/axios';

class LeadDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  async componentDidMount() {
    const { camp_id, lead_id } = this.props.match.params
    // Get campaign detail
    try {
      toggleTopLoader(true);
      const { data: {success, content} } = await axios.get(`/campaign/lead-detail/${camp_id}/${lead_id}/`);
      if (success) {
        this.setState({
          data: content
        })
      }
    } catch (e) {
      toastOnError(messages.api_failed);
    } finally {
      toggleTopLoader(false);
    }
  }

  getFullName = (first_name, last_name) => {
    const arr = [];
    if (first_name) arr.push(first_name)
    if (last_name) arr.push(last_name)
    return arr.join(" ");
  }

  render() {
    const campTitle = "Lead Detail";

    const { data } = this.state;
    const timeline = [];
    if (data) {
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
    }
    timeline.sort((a, b) => {
      if (a.dt.isAfter(b.dt)) return -1;
      if (a.dt.isBefore(b.dt)) return 1;
      return 0;
    })

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
                  {/* <div className="timeline-block">
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
                      {
                        data &&
                        <Card className="lead-initial-email mt-3">
                          <CardHeader className="p-3">
                            <label>From:</label><span><strong>{this.getFullName(data.from_first_name, data.from_last_name)}</strong> {data.from_email_addr}</span><br />
                            <label>Subject:</label><span><strong>{ data.email_subject }</strong></span>
                          </CardHeader>

                          <CardBody className="p-3">
                            <div dangerouslySetInnerHTML={{__html: data.email_body}}>
                            </div>
                          </CardBody>
                        </Card>
                      }
                    </div>
                  </div> */}
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
                              item.type === 'sent' && data &&
                              <Card className="lead-initial-email mt-3">
                                <CardHeader className="p-3">
                                  <label>From:</label><span><strong>{this.getFullName(data.from_first_name, data.from_last_name)}</strong> {data.from_email_addr}</span><br />
                                  <label>Subject:</label><span><strong>{ data.email_subject }</strong></span>
                                </CardHeader>

                                <CardBody className="p-3">
                                  <div dangerouslySetInnerHTML={{__html: data.email_body}}>
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
