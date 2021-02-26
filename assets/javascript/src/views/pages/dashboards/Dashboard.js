/*!

=========================================================
* Argon Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
/home/hr-01/project/MailSaaS/assets/javascript/src/components/Navbars/AdminNavbar.js
*/
import React from "react";
import classnames from "classnames";
import AdminNavbar from '../../../../../javascript/src/components/Navbars/AdminNavbar'
// node.js library that concatenates classes (strings)
import CardHeader from "../../../../src/components/Headers/CardsHeader"
// importing routing module
import { Link } from 'react-router-dom'

import {
  Button,
  Container,
  Row,
  Nav,
  Navbar
} from "reactstrap";
// /home/hr-01/project/MailSaaS/assets/javascript/src/components/Headers/CardsHeader.js
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1"
    };
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
     <AdminNavbar/>
          {/* <Container fluid className="dashboard_title" style={{}}>
            <Row className="main_title"><h1 className="Main-title">Welcome to MailSaaS</h1></Row>
            <Row className="sub_title"><h3>A simple solution for email outreach.</h3></Row>
            <Row className="New_campaign_button">
              <Link to="/app/admin/CampaignStart">
                <Button style={{ background: '#172b4d', color: "white" }}>+ NEW CAMPAIGN</Button>
              </Link>
            </Row>
          </Container> */}
          <CardHeader></CardHeader>
      </div>
    );
  }
}

export default Dashboard;