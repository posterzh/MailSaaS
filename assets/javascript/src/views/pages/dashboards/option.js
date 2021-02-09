// file for option pick in campaign
import React, { Component } from 'react'
import { Container, Row, Col,Form } from 'reactstrap'
import { OptionAction } from '../../../redux/action/AuthourizationAction'
import {connect} from 'react-redux'; 
// import  from 'reactstrap/lib/Form';
class Option extends Component {
    constructor() {
        super()
        this.state = {
            trackopen: true,
            tracklinkclicks: true,
            schedulesend: true,
            date: new Date("{0:dd/MM/yyyy}"),
            time:'',
            termsandlaws: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({
          trackopen:!this.state.trackopen,
          tracklinkclicks:!this.state.tracklinkclicks,
          schedulesend:!this.state.schedulesend,
          termsandlaws:!this.state.termsandlaws
        })
        console.log("trackopen",this.state.trackopen)
        console.log("tracklinkclicksdf",this.state.tracklinkclicks)
        console.log("schedulesend",this.state.schedulesend)
        console.log("termsandlaws",this.state.termsandlaws)
        

    }

    handledate=(event)=>
    {
        this.setState({
            date:event.target.value
        },()=>{console.log(this.state.date,'date');})
    }
    handletime=(event)=>
    {
        this.setState({
            time:event.target.value
        },()=>{console.log(this.state.time,'time');})
    }

    handleSubmit = (event) => {
        console.log('option.js');
        event.preventDefault();
        console.log(this.state)
        const optionData = {
            campaign: '1',
            trackOpens: this.state.trackopen,
            trackLinkClick: this.state.tracklinkclicks,
            schedule_send: this.state.schedulesend,
            schedule_date: `${this.state.date}+${this.state.time}`,
            terms_and_laws: this.state.termsandlaws
        }
        this.props.OptionAction(optionData)
    }
    render() {
        return (
            <div>
                <Container>
                    <Row className="option_note">Tweak how your campaign will be sent</Row>
                </Container>
                <Container>
                    <Row>
                        <Form onSubmit={this.handleSubmit}>
                        <Col md="6" className="mx-auto">
                            <Row>
                                <div >
                                    <input type="checkbox"  name='trackopen'defaultChecked={this.state.trackopen} onClick={this.handleChange}></input>&nbsp;
                                    <span className="track_option">Track opens</span><br />
                                    <input type="checkbox" name='tracklinkclicks' defaultChecked={this.state.tracklinkclicks} onClick={this.handleChange}></input>
                                    <span className="track_line">Track Link clicks</span><br />
                                    <input type="checkbox" name='schedulesend' defaultChecked={this.state.schedulesend} onClick={this.handleChange}></input>
                                    <span className="schedule">Schedule this send</span>
                                </div>
                            </Row>
                            <Row>
                                <div className="time_container">
                                    <span className="sending_calendar">Sending calendar timezone</span><br />
                                    <span className="time_zone">Asia/Calcutta</span><br />
                                </div>
                            </Row>
                            <Row style={{ marginLeft: "2px" }}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <input type="date" className="date_picker"  name='date' value={this.state.date} onChange={this.handledate}/>
                                    <input type="time" className="time_picker" name='time' value={this.state.time} onChange={this.handletime}/><br />
                                </div>
                            </Row>
                            <Row className="Leadcatcher_settingdiv">
                                <span className="leadcatchersetting_icon"><i class="fa fa-caret-down"></i></span>
                                <span className="leadcatchersetting">Lead Catcher setting</span>
                            </Row>
                            <Row>
                                <span className="about_leadcatcher">ABOUT LEAD CATCHER</span>
                                <span className="about_leadcatchericon"><i class="fa fa-question-circle-o" aria-hidden="true"></i></span><br />
                                <span className="leadcatcher_note">Follow-up emails stop when a recipient becomes a lead, and leads are collected in one place so you can efficiently respond or take action.</span>
                            </Row>
                            <Row className="select_boxdiv">
                                <div>
                                    <label className="selectbox_label">Who should leads be assigned to?</label><br />
                                    <select className="select_box">
                                        <option value="" selected>me</option>
                                    </select>
                                </div>
                            </Row>
                            <Row >
                                <div>
                                    <span className="recipient_condition">When does a recipient become a lead?</span>
                                    <div>
                                        <div className="recipient_replies">
                                            <span style={{ display: "flex" }}>
                                                <label className="Recipient_label">Recipient</label>
                                                <span className="numberof_replieslabel" ># of times</span>
                                            </span>
                                            <div style={{ display: "flex", flexDirection: "row" }}>
                                                {/* <span className="replies_selectbox"> */}
                                                <select>
                                                    <option value="" selected>Replies</option>
                                                    <option value="" >Opens</option>
                                                    <option value="" >Click any link</option>
                                                    <option value="" >Click apecific link</option>
                                                </select>
                                                {/* </span> */}
                                                {/* <span className="numberof_replieslabel"># of times</span> */}
                                                {/* <span className="numberof_repliesinput"> */}
                                                <input type="text" />
                                                {/* </span> */}
                                                <span className="delete_icon"><i class="fa fa-trash"></i></span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <span><i class="fa fa-caret-down"></i></span>
                                <span>CRM sync</span>
                            </Row>
                            <Row>
                                <span>CRM sync</span><br />
                            </Row>
                            <Row>
                                <span>Send updates to your team‘s CRMs when this campaign has activity:</span>
                            </Row>
                            <Row>
                                <span><input type="checkbox" /></span>
                                <span><i class="fa fa-slack"></i></span>
                                <span>Extern Labs</span>
                            </Row>
                            <Row>
                                <div>
                                    <input type="checkbox" name='termsandlaws'  defaultChecked={this.state.termsandlaws} onClick={this.handleChange} />
                                    <span>I'll obey pertinent laws and I've read these< a href="www.google.com"> important notes.</a>
                                    </span>
                                </div>
                            </Row>
                            <Row>
                                <button type="submit">next</button>
                                </Row>
                        </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
        );
    }
}
// export default Option

const mapStateToProps = (state) => {
    return {
        // token: state.token
    };
};
const mapDispatchToProps = dispatch => ({
    OptionAction: optionData=> {
        dispatch(OptionAction(optionData));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(Option)
