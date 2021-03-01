import React, { useState } from "react";

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
} from "reactstrap";
import classnames from "classnames";
import CampaignDetails from "./CampaignDetails";
import OverviewSummery from "./components/OverviewSummery";
import OverviewActivity from "./components/OverviewActivity";
import { Component } from "react";
import { connect } from "react-redux";

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
class CampaignData extends Component {
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
      <div>
        <Container fluid>
          <Row>
            <CampaignDetails
              id={
                this.props.history.location.state &&
                this.props.history.location.state.id
              }
            />
          </Row>
          <Row className="mt-4">
            <Col md={8} className="mx-auto">
              <Nav tabs>
                <Col md={3}>
                  <select className="select_overview">
                    <option>All recipient lists</option>
                    <option value="Date">Date</option>
                  </select>
                </Col>
                {tabs.map(({ to, title }, index) => (
                  <Col key={index} md={3}>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          [`active${index + 1}`]: activeTab === index,
                        })}
                        to={to}
                        onClick={() => {
                          this.onSelectTab(index);
                        }}
                      >
                        {title}
                      </NavLink>
                    </NavItem>
                  </Col>
                ))}
                {/* <Col md={1}><div className='child ml-3'>
                            <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                <span className='font_icon'><i className="fa fa-undo" aria-hidden="true"></i></span>
                            </a></div>
                        </Col> */}
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
                    <Col
                      sm="4"
                      className="mx-auto"
                      style={{ border: "2px solid" }}
                    >
                      <h4>Tab 3 Contents</h4>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
          {/* </Col>
                </Row> */}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campaignOverviewData: state.CampaignOverviewReducer.CampaignOverviewData,
  };
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignData);
