// file for option pick in campaign
import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Button,
  Card
} from "reactstrap";
import { CampaignOptionAction } from "../../../../redux/action/CampaignAction";
import { connect } from "react-redux";
import { campaignOptions } from "../../../../redux/action/CampaignActions";

class TheOptions extends Component {
  constructor() {
    super();
    this.state = {
      trackopen: true,
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
      track_opens: this.state.trackopen,
      terms_and_laws: this.state.termsandlaws
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
                  defaultChecked={this.state.trackopen}
                  name="trackopen"
                  onChange={this.handleChange}
                />
                <label className="custom-control-label" htmlFor="check1">
                  Track opens
                </label>
                {!this.state.trackopen &&
                  <Card className="pt-3 pl-3 mt-3" style={{ backgroundColor: "#e9e9e9" }}>
                    <span><i className="ni ni-air-baloon text-warning"></i>&nbsp;&nbsp;<b>Friendly remember</b></span>
                    <p>Disabling tracking may affect your rules for follow-ups or lead-catcher and may prevent click-triggered messages from sending.</p>
                  </Card>
                }
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input
                  className="custom-control-input"
                  id="check2"
                  type="checkbox"
                  checked={this.state.termsandlaws}
                  name="termsandlaws"
                  onChange={this.handleChange}
                  required
                />
                <label className="custom-control-label" htmlFor="check2">
                  I'll obey pertinent laws and I've read the
                  <a href="www.google.com"> important notes.</a>
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
