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
    const id = this.props.match.params.id;
    if (!parseInt(id)) {
      this.props.history.push('/app/admin/campaign/list');
    } else {
      this.props.getOverviewSummary(id);
    }
  }

  render() {
    const { activeTab } = this.state;
    const { id, title } = this.props;
    const campTitle = title ? title : "Date Outreach";

    return (
      <>
        <PageHeader
          current={campTitle}
          parent="Campaign Details"
          showStatus={false}
        />

        <PageContainer title={campTitle} showHelper={false}>
          <Row>
            <DetailHeader activeItem="OVERVIEW" id={id}/>
          </Row>
          <Row className="mx-3 mt-5">
            <Col md={12}>
              <OverviewSummery/>
              {/* <Nav tabs>
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
              </TabContent> */}
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
  getOverviewSummary
})(CampaignDetailOverview);
