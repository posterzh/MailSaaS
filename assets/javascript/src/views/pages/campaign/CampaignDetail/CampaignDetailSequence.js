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
import PageHeader from "../../../../components/Headers/PageHeader";
import PageContainer from "../../../../components/Containers/PageContainer";
import DetailHeader from "./components/DetailHeader";

export default class CampaignDetailRecipients extends React.Component {
  render() {
    return (
      <>
        <PageHeader
          current="Date Outreach"
          parent="Campaign List"
          showStatus={false}
        />

        <PageContainer title="Date Outreach">
          <Row>
            <DetailHeader activeItem="SEQUENCE" />
          </Row>
          <Row className="mt-5">
            <Col md={10} className="mx-auto">
              <Row>
                <Button color="danger" className="mx-auto">
                  EDIT SEQUENCE
                </Button>
              </Row>
              <Row className="mt-4">
                <div className="Sequence_div">
                  <span>
                    {" "}
                    <a href="">
                      <i className="fa fa-envelope"></i> &nbsp;Initial campaign
                      email
                    </a>
                  </span>
                  <br></br>
                  <span style={{ lineHeight: "1.4" }}>Hello all</span>
                  <p>this is a pera graph</p>
                </div>
              </Row>
              <Row>
                <div className="sequence_draw_div">
                  <div className="line_div"></div>
                </div>
                <div className="sequence_draw_div">
                  <div className="sequence_circle"></div>
                </div>
                <div className="sequence_draw_div">
                  <div className="line_div"></div>
                </div>
              </Row>
              <Row className="mb-5">
                <div className="Sequence_div">
                  <span>
                    {" "}
                    <a href="">
                      <i className="fa fa-reply"></i> &nbsp;follow up
                    </a>
                  </span>
                  <br></br>
                  <span style={{ lineHeight: "1.4" }}>Hello all</span>
                  <p>this is a pera graph</p>
                </div>
              </Row>
            </Col>
          </Row>
        </PageContainer>
      </>
    );
  }
}
