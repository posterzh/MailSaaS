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

  getPlural = (val, unit) => {
    if (!val) return unit;
    
    if (val > 1) {
      return val + ' ' + unit + 's';
    } else {
      return val + ' ' + unit;
    }
  }

  render() {
    const { index, onDelete, data, preview} = this.props;

    return (
      <Container fluid>
        <Row className="mt-3">
          <Col md={12} className="alignRight">
            <Row>
              <h2 className="display-6">Drips</h2>
              {onDelete && 
                <div
                  className="btn btn-outline-warning btn-sm "
                  onClick={() => onDelete(index)}
                  style={{position: 'absolute', right: 0, top: 5}}
                >
                  <i style={{ paddingRight: 5 }} className="fa">
                    &#xf014;
                  </i>
                  DELETE
                </div>
              }
            </Row>
            {preview ? 
              <Row>
                <i className="fas fa-stopwatch" aria-hidden="true"></i><span>&nbsp;&nbsp;Drip {this.getPlural(data.waitDays, 'day')} later</span>
              </Row>
              :
              <>
                <Row>
                  <p style={{ fontSize: "14px" }}>
                    Unlike follow-ups, drips keep sending even after a recipient
                    becomes a lead.{" "}
                    <a href="">Learn how to customize Lead Catcher.</a>
                  </p>
                </Row>
                <Row>
                  <Col md={2} sm={6} className="WaitDiv">
                    <label className="filter_app_new"><i className="fas fa-stopwatch" aria-hidden="true"></i>&nbsp;Wait X days</label>
                    <Input
                      defaultValue={data.waitDays}
                      onChange={(e) => {
                        this.setState({ waitDays: e.target.value });
                        data.waitDays = e.target.value;
                      }}
                      type="number"
                      className="WaitInput"
                    ></Input>
                  </Col>
                </Row>
              </>
            }
            
            <Row className="mt-3">
              <Input
                defaultValue={data.subject}
                onChange={(e) => {
                  this.setState({ subject: e.target.value });
                  data.subject = e.target.value;
                }}
                type="text"
                className="in"
                name="subject"
                placeholder="Subject"
                required={!preview}
                disabled={preview}
              />
            </Row>
            <Row>
              <Col className="p-0">
                <ReactQuill
                  defaultValue={data.email_body}
                  onChange={(value) => {
                    this.setState({ email_body: value });
                    data.email_body = value;
                  }}
                  theme={preview ? "bubble" : "snow"}
                  className="Quill_div"
                  readOnly={preview}
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
