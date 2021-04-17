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
// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Button,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ListGroupItem,
  ListGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { gapi } from "gapi-script";
import { getProfile } from '../../redux/action/ProfileAction';
import { logout } from '../../redux/action/AuthAction'
import { connect } from 'react-redux'

class AdminNavbar extends React.Component {
  componentDidMount() {
    this.props.getProfile();
  }

  // function that on mobile devices makes the search open
  openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function () {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };

  // function that on mobile devices makes the search close
  closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function () {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };

  // handle logout
  handleLogout = (event) => {
    event.preventDefault();
    // const auth2 = gapi.auth2.getAuthInstance();
    // if (auth2 != null) {
    //   auth2.signOut().then(
    //     auth2.disconnect().then(console.log('LOGOUT SUCCESSFUL'))
    //   )
    // }
    this.props.logout();
  }

  render() {
    let { theme, sidenavOpen, toggleSidenav } = this.props
    return (
      <>
        <Navbar
          className={classnames(
            "navbar-top navbar-expand border-bottom",
            { "navbar-dark bg-info": this.props.theme === "dark" },
            { "navbar-light bg-secondary": this.props.theme === "light" }
          )}
        >
          <Container fluid>
            <Collapse navbar isOpen={true}>
              <Form
                className={classnames(
                  "navbar-search form-inline",
                  { "navbar-search-light": this.props.theme === "dark" },
                  { "navbar-search-dark": this.props.theme === "light" }
                )}
              >
                {/* <div style={{border:'2px solid'}}></div> */}

                <div
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <h1 style={{ color: "white" }}>MailSaaS</h1>
                </div>
              </Form>

              <Nav className="align-items-center ml-md-auto" navbar>
              </Nav>
              <Nav className="align-items-center ml-auto ml-md-0" navbar>
                <NavItem className="d-xl-none">
                  <div
                    className={classnames(
                      "pr-3 sidenav-toggler",
                      { active: sidenavOpen },
                      { "sidenav-toggler-dark": theme === "dark" }
                    )}
                    onClick={toggleSidenav}
                  >
                    <div className="sidenav-toggler-inner">
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                      <i className="sidenav-toggler-line" />
                    </div>
                  </div>
                </NavItem>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="nav-link pr-0" color="" tag="a">
                    <Media className="align-items-center">
                      <span className="avatar avatar-sm rounded-circle">
                        <img alt="..." src={this.props.user.avatar_url ? this.props.user.avatar_url : STATIC_FILES.default_avatar}
                          style={{ background: "ghostwhite" }} />
                      </span>
                      <Media className="ml-2 d-none d-sm-block">
                        <span className="mb-0 text-sm font-weight-bold">
                          {
                            this.props.user !== undefined && this.props.user.first_name
                          }
                        </span>
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem href="/app/admin/profile">
                      <i className="ni ni-single-02" />
                      <span>My profile</span>
                    </DropdownItem>
                    {/* <DropdownItem
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className="ni ni-settings-gear-65" />
                      <span>Settings</span>
                    </DropdownItem> */}
                    <DropdownItem divider />
                    <DropdownItem
                      onClick={this.handleLogout}
                    >
                      <i className="ni ni-user-run" />
                      <span>Logout</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
AdminNavbar.defaultProps = {
  toggleSidenav: () => { },
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    socialType: state.auth.socialType,
    isLogin: state.auth.isLogin,
  }
};

export default connect(mapStateToProps, {
  getProfile,
  logout
})(AdminNavbar);
