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
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";
import OverviewSummery from "./components/OverviewSummery";
import OverviewActivity from "./components/OverviewActivity";

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

  render() {
    const { activeTab } = this.state;
    const { campaignOverviewData } = this.props;
    console.log("campaignOverviewData", this.props.history);
    return (
      <>
        <PageHeader
          current="Date Outreach"
          parent="Campaign List"
          showStatus={false}
        />

        <PageContainer title="Date Outreach">
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
                      <p className="my-5">Tab 3 Contents</p>
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

const mapStateToProps = (state) => {
  return {
    campaignOverviewData: state.CampaignOverviewReducer.CampaignOverviewData,
  };
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetailOverview);
