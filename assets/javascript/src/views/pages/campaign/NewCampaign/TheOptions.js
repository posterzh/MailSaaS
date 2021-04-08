// file for option pick in campaign
import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { campaignOptions } from "../../../../redux/action/CampaignActions";

class TheOptions extends Component {
  constructor() {
    super();
    this.state = {
      trackOpen: true,
      trackLink: true,
      termsandlaws: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.checked,
      }
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    const optionData = {
      track_opens: this.state.trackOpen,
      terms_and_laws: this.state.termsandlaws,
      track_linkclick: this.state.trackLink
    };
    this.props.campaignOptions(optionData);
    this.props.onNext();
  };

  onPrev = () => {
    this.props.onPrev();
  };

  render() {
    const { onPrev, onNext } = this.props;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <h3 className="text-center my-4">
                Tweak how your campaign will be sent
              </h3>
            </Col>
          </Row>
          <Row>
            <Col className="mx-auto">
              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="check1"
                  type="checkbox"
                  defaultChecked={this.state.trackOpen}
                  name="trackOpen"
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" htmlFor="check1">
                  Track opens
                </label>
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="check2"
                  type="checkbox"
                  defaultChecked={this.state.trackLink}
                  name="trackLink"
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" htmlFor="check2">
                  Track link clicks
                </label>
                {(!this.state.trackOpen || !this.state.trackLink) &&
                  <Card className="pt-3 pl-3 mt-3" style={{ backgroundColor: "#e9e9e9" }}>
                    <span><i className="ni ni-air-baloon text-warning"></i>&nbsp;&nbsp;<b>Friendly remember</b></span>
                    <p>Disabling tracking may affect your rules for follow-ups or lead-catcher and may prevent click-triggered messages from sending.</p>
                  </Card>
                }
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="check3"
                  type="checkbox"
                  checked={this.state.termsandlaws}
                  name="termsandlaws"
                  onChange={this.handleChange}
                  required
                />
                <label className="custom-control-label" htmlFor="check3">
                  I'll obey pertinent laws and I've read the
                  <a href="/terms" target="_blank"> important notes.</a>
                </label>
              </div>
            </Col>
          </Row>

          {/* Buttons */}
          <Row className="my-3">
            <Col className="text-left">
              {onPrev && (
                <Button color="primary" type="button" outline onClick={this.onPrev}>
                  <i className="fa fa-arrow-left" aria-hidden="true"></i>
                  {" "}PREV
                </Button>
              )}
            </Col>
            <Col className="text-right">
              {onNext && (
                <Button color="danger" type="submit">
                  NEXT <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  campaign: state.campaign,
});

export default connect(mapStateToProps, { campaignOptions })(
  TheOptions
);
