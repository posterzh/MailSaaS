import React from "react";
import { Container, Row, Col, Input } from "reactstrap";
import ReactQuill from "react-quill";

export default class DripPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waitDays: 1,
      subject: "",
      email_body: "",
    };
  }
  render() {
    const { index, onDelete, data } = this.props;

    return (
      <Container fluid>
        <Row className="mt-3">
          <Col md={12} className="alignRight">
            <Row>
              <h1 className="display-6">Drips</h1>
            </Row>
            <Row>
              <p style={{ fontSize: "14px" }}>
                Unlike follow-ups, drips keep sending even after a recipient
                becomes a lead.{" "}
                <a href="">Learn how to customize Lead Catcher.</a>
              </p>
            </Row>
            <Row>
              <Col md={2} className="WaitDiv">
                <label className="filter_app_new">Wait X days</label>
                <br></br>
                <input
                  value={this.state.waitDays}
                  onChange={(e) => {
                    this.setState({ waitDays: e.target.value });
                    data.waitDays = e.target.value;
                  }}
                  type="number"
                  className="WaitInput"
                ></input>
              </Col>
            </Row>
            <Row className="mt-3">
              <Input
                value={this.state.subject}
                onChange={(e) => {
                  this.setState({ subject: e.target.value });
                  data.subject = e.target.value;
                }}
                type="text"
                className="in"
                name="subject"
                placeholder="Subject"
              />
            </Row>
            <Row className="mt-3">
              <Col className="p-0">
                <div
                  className="btn btn-outline-warning btn-sm "
                  onClick={() => onDelete(index)}
                >
                  <i style={{ padding: 5 }} className="fa">
                    &#xf014;
                  </i>
                  DELETE
                </div>
                <ReactQuill
                  value={this.state.email_body}
                  onChange={(value) => {
                    this.setState({ email_body: value });
                    data.email_body = value;
                  }}
                  theme="snow"
                  className="Quill_div"
                  modules={{
                    toolbar: [
                      ["bold", "italic"],
                      ["link", "blockquote", "code", "image"],
                      [
                        {
                          list: "ordered",
                        },
                        {
                          list: "bullet",
                        },
                      ],
                    ],
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}
