/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
// importing new campaign creation component
import NewCampaign from "./NewCampaign"
import Option from "./option"


// importing routing module
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core componentser.js";
import CardsHeader from "../../../components/Headers/CardsHeader";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../variables/charts.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  render() {
    return (
      <div>
          <Container fluid className="dashboard_title" style={{}}>
            <Row className="main_title"><h1 className="Main-title">Welcome to MailSaaS</h1></Row>
            <Row className="sub_title"><h3>A simple solution for email outreach.</h3></Row>
            <Row className="New_campaign_button">
              <Link strict to="/app/admin/new-campaign">
                <Button>NEW CAMPAIGN</Button>
              </Link>
            </Row>
          </Container>
          < Option />
      </div>
    );
  }
}

export default Dashboard;
