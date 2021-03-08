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
// react library for routing
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button
} from "reactstrap";
import {LogoutAction} from '../../redux/action/AuthourizationAction'

class AdminNavbar extends React.Component {
  onLogoutClicked = (event) => {
    event.preventDefault();
    this.props.LogoutAction()
  }
  render() {
    const {isLogin} = this.props;
    return (
      <>
        <Navbar
          className="navbar-horizontal navbar-main navbar-dark bg-info"
          expand="lg"
          id="navbar-main"
        >
          <Container>
            <NavbarBrand to="/app/" tag={Link}>
              <img
                alt="..."
                src={STATIC_FILES.mailsaas_logo}
                // src={require("assets/img/brand/argon-react-white.png")}
              />
            </NavbarBrand>
            <button
              aria-controls="navbar-collapse"
              aria-expanded={false}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-target="#navbar-collapse"
              data-toggle="collapse"
              id="navbar-collapse"
              type="button"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              className="navbar-custom-collapse"
              navbar
              toggler="#navbar-collapse"
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <Link to="/app/admin/dashboard">
                      <img
                        alt="..."
                        // src={require("assets/img/brand/blue.png")}
                        src={STATIC_FILES.mailsaas_logo}
                      />
                      <span>MailSaaS</span>
                    </Link>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button
                      aria-controls="navbar-collapse"
                      aria-expanded={false}
                      aria-label="Toggle navigation"
                      className="navbar-toggler"
                      data-target="#navbar-collapse"
                      data-toggle="collapse"
                      id="navbar-collapse"
                      type="button"
                    >
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink to="/app/admin/dashboard" tag={Link}>
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/app/auth/pricing" tag={Link}>
                    <span className="nav-link-inner--text">Pricing</span>
                  </NavLink>
                </NavItem>
                {
                  !isLogin && (
                  <>
                    <NavItem>
                      <NavLink to="/app/auth/login" tag={Link}>
                        <span className="nav-link-inner--text">Login</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink to="/app/auth/register" tag={Link}>
                        <span className="nav-link-inner--text">Register</span>
                      </NavLink>
                    </NavItem>
                  </>)
                }
                {
                  isLogin && (
                    <>
                      <NavItem>
                        <NavLink to="/" tag={Link} onClick={this.onLogoutClicked}>
                          <span className="nav-link-inner--text">Logout</span>
                        </NavLink>
                      </NavItem>
                    </>)
                }
              </Nav>
              <hr className="d-lg-none" />
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.LoginReducer ? state.LoginReducer.isLogin : false,
  }
};

const mapDispatchToProps = dispatch => ({
  LogoutAction: () => { dispatch(LogoutAction()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
