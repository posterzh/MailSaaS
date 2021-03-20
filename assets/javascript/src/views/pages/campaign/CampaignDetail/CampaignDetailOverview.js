import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
} from "reactstrap";
import classnames from "classnames";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";
import OverviewSummery from "./components/OverviewSummery";
import OverviewActivity from "./components/OverviewActivity";

import { getOverviewSummary } from "../../../../redux/action/CampaignDetailsActions";

const tabs = [
  {
    to: "/campaign_data",
    title: "SUMMARY",
  },
  {
    to: "campaign_data",
    title: "ACTIVITY",
  },
  {
    to: "OverviewActivity",
    title: "TIMELINE",
  },
];
class CampaignDetailOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  onSelectTab(activeTab) {
    this.setState({
      activeTab,
    });
  }

  componentDidMount() {
    
    this.props.getOverviewSummary(this.props.match.params.campId);
  }

  render() {
    const { activeTab } = this.state;
    const campaignTitle = this.props.overviewSummary.title ? this.props.overviewSummary.title: "Date Outreach";

    return (
      <>
        <PageHeader
          current={campaignTitle}
          parent="Campaign Details"
          showStatus={false}
        />

        <PageContainer title={campaignTitle} showHelper={false}>
          <Row>
            <DetailHeader activeItem="OVERVIEW" />
          </Row>
          <Row className="mt-4">
            <Col md={8} className="mx-auto">
              <Nav tabs>
                <Col md={3}>
                  <Input
                    id="selectRecipients"
                    type="select"
                    className="form-control-sm"
                  >
                    <option>All recipient lists</option>
                    <option value="Date">Date</option>
                  </Input>
                </Col>
                {tabs.map(({ to, title }, index) => (
                  <Col key={index} md={3}>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: activeTab === index })}
                        to={to}
                        onClick={() => {
                          this.onSelectTab(index);
                        }}
                        style={{
                          backgroundColor: "transparent",
                          textAlign: "center",
                        }}
                      >
                        {title}
                      </NavLink>
                    </NavItem>
                  </Col>
                ))}
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId={0}>
                  <OverviewSummery />
                </TabPane>
                <TabPane tabId={1}>
                  <OverviewActivity />
                </TabPane>
                <TabPane tabId={2}>
                  <Row>
                    <Col>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  overviewSummary: state.campaignDetails.overviewSummary
});

export default connect(mapStateToProps, {
  getOverviewSummary
})(CampaignDetailOverview);
