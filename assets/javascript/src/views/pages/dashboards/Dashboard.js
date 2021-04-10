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
// importing routing module
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  CardText,
} from "reactstrap";
import { connect } from "react-redux";
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";

// /home/hr-01/project/MailSaaS/assets/javascript/src/components/Headers/CardsHeader.js
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    const { campaigns } = this.props;

    return (
      <>
        <PageHeader
          current="Dashboard"
          parent="Dashboard"
          showStatus={campaigns.length > 0}
        />

        <PageContainer title="Welcome to MailSaaS">
          <Row>
            <Col md={8} className="mx-auto">
              <CardText className="mb-4">
                A simple solution for email outreach. A simple solution for
                email outreach. A simple solution for email outreach. A
                simple solution for email outreach. A simple solution for
                email outreach. A simple solution for email outreach. A
                simple solution for email outreach. A simple solution for
                email outreach. A simple solution for email outreach.
              </CardText>
              <Link to="/app/admin/campaign/create">
                <Button className="btn-icon" color="primary" type="button">
                  <span className="btn-inner--icon mr-1">
                    <i className="ni ni-fat-add" />
                  </span>
                  <span className="btn-inner--text">NEW CAMPAIGN</span>
                </Button>
              </Link>
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}

// export default Dashboard;

const mapStateToProps = (state) => {
  return {
    campaigns: state.CampaignTableReducer.CampaignTableData,
  };
};
export default connect(mapStateToProps)(Dashboard);