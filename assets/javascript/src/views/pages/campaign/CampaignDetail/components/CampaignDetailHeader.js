import React, { Component } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";

export default class CampaignDetailHeader extends Component {
  render() {
    const { id } = this.props;
    return (
      <>
        <div className="campaign_navbar">
          <Container fluid>
            <Row className="">
              <ul style={{ listStyleType: "none", display: "flex" }}>
                <li className="m-3">
                  <Link to="/app/admin/CampaignList">
                    <span className="nav_link">
                      <i className="fas fa-chevron-left"></i>
                    </span>
                  </Link>
                </li>
                <li className="m-3">
                  <Link to="/app/admin/CampaignDetailOverview">
                    <span className="nav_link">Overview</span>
                  </Link>
                </li>
                <li className="m-3">
                  <Link
                    to={{
                      pathname: "/app/admin/CampaignDetailSequence",
                      state: {
                        id: this.props.id,
                      },
                    }}
                  >
                    <span className="nav_link">Sequence</span>
                  </Link>
                </li>

                <li className="m-3">
                  <Link
                    to={{
                      pathname: "/app/admin/CampaignDetailRecipients",
                      state: {
                        id: this.props.id,
                      },
                    }}
                  >
                    <span className="nav_link">Recipients</span>
                  </Link>
                </li>
                <li className="m-3">
                  <Link
                    to={{
                      pathname: "/app/admin/CampaignDetailsettings",
                      state: {
                        id: this.props.id,
                      },
                    }}
                  >
                    <span className="nav_link">Settings</span>
                  </Link>
                </li>
              </ul>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
