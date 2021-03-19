import React from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { campaignStart } from "../../../../redux/action/CampaignActions";

class TheStart extends React.Component {
  constructor(props) {
    super(props);
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var now = new Date();
    var thisMonth = months[now.getMonth()];
    const title = thisMonth + " " + now.getDate() + " Outreach";
    this.state = {
      title: title,
      from_address: "",
      mailsExist: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: this.state.title,
      from_address: this.state.from_address,
    };

    this.props.campaignStart(data);
    this.props.onNext();
  };

  render() {
    const { onPrev, onNext, mailAccounts } = this.props;
    console.log(mailAccounts);
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col>
              <h2 className="text-center my-4">Let's get started</h2>
            </Col>
          </Row>

          <Row>
            <Col>
              <FormGroup>
                <label className="form-control-label" htmlFor="inputTitle">
                  Title (for your team's eyes only)
                </label>
                <Input
                  id="inputTitle"
                  type="text"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder={this.state.title}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label className="form-control-label" htmlFor="selectFromAddress">
                  From Address
                </label>
                <Input
                  id="selectFromAddress"
                  name="from_address"
                  type="select"
                  onChange={this.handleChange}
                  required
                >
                  <option value="">Select</option>
                  {mailAccounts && mailAccounts.map((item, index) => (
                    <option value={item.id} key={index}>
                      {item.email}
                    </option>
                  ))}
                </Input>
              </FormGroup>
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
  mailAccounts: state.mailAccounts.mailAccounts,
});
export default connect(mapStateToProps, { campaignStart })(
  TheStart
);
