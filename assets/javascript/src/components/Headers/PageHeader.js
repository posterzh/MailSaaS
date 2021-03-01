/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
} from "reactstrap";

function PageHeader({ current, parent, showStatus, showDataStatus=[] }) {
  return (
    <>
      <div className="header bg-info pb-5">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center pb-3  px-0">
              <Col lg="6" xs="7" className="px-0">
                {/* <h6 className="h2 text-white d-inline-block mb-0">{current}</h6>{" "} */}
                <Breadcrumb
                  className="d-none d-md-inline-block ml-md-4"
                  listClassName="breadcrumb-links breadcrumb-dark"
                >
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <i className="fa fa-home fa-lg" />
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      {parent}
                    </a>
                  </BreadcrumbItem>
                  <BreadcrumbItem aria-current="page" className="active">
                    {current}
                  </BreadcrumbItem>
                </Breadcrumb>
              </Col>
            </Row>

            {(showStatus == undefined || showStatus) && (
              <Row>
                {
                  showDataStatus.map((item) => {
                    return (
                      <Col md="3" xl="3" sm="6" xs="6">
                        <Card className="card-stats">
                          <CardBody>
                            <Row>
                              <div className="col">
                                <CardTitle
                                  tag="h5"
                                  className="text-uppercase text-muted mb-0"
                                >
                                  {item.name}
                                </CardTitle>
                                <span className="h1 font-weight-bold mb-0">{item.count}</span>
                              </div>
                              <Col className="col-auto">
                                <div
                                  className={
                                    "icon icon-shape text-white rounded-circle shadow " +
                                      (
                                        item.persent >= 0  && item.persent <= 25 ? "bg-gradient-red": (
                                          item.persent > 25 && item.persent <= 60 ? "bg-gradient-orange" : (
                                            item.persent > 60 && item.persent <= 85 ? "bg-gradient-primary" : (
                                              "bg-gradient-green"
                                            )
                                          )
                                        )
                                      )
                                    }
                                  >
                                  <i className="ni ni-active-40" />
                                </div>
                              </Col>
                            </Row>
                            <p className="mt-3 mb-0 text-sm">
                              <span className="text-success mr-2">{item.persent}%</span>{" "}
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}

PageHeader.propTypes = {
  current: PropTypes.string,
  parent: PropTypes.string,
};

export default PageHeader;
