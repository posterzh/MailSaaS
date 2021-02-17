import React, { Component } from 'react'
import { Container, Row, Col, Form ,Nav} from 'reactstrap'
import { Link, Route } from 'react-router-dom';
import { CampaignOptionAction } from '../../../redux/action/CampaignAction'
import { connect } from 'react-redux';
class CampaignOption extends Component {
    constructor() {
        super()
        this.state = {
            trackopen: true,
            tracklinkclicks: true,
            schedulesend: false,
            termsandlaws: false,
            date: '',
            time: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: !event.target.defaultChecked,
        }, () => { console.log(this.state) })
    }
    handleDate = (event) => {
        this.setState({
            date: event.target.value
        }, () => { console.log(this.state.date, 'date'); })
    }
    handleTime = (event) => {
        this.setState({
            time: event.target.value
        }, () => { console.log(this.state.time, 'time'); })
    }
    handleSubmit = (event) => {
        console.log('option.js');
        event.preventDefault();
        console.log(this.state)
        const optionData = {
            campaign: 1,
            trackOpens: this.state.trackopen,
            trackLinkClick: this.state.tracklinkclicks,
            schedule_send: this.state.schedulesend,
            schedule_date: this.state.date,
            schedule_time: `${this.state.time}${':00'}`,
            terms_and_laws: this.state.termsandlaws
        }
        this.props.CampaignOptionAction(optionData)
    }
    render() {
        return (
            <div>
                <Container fluid>
                    <Row style={{ width: '100%', borderBottom: "1px solid #dedede" }}>
                        <Col style={{ display: 'flex', alignItems: 'center' }}>
                            <div className='logo_div' style={{ display: 'flex', alignItems: 'center' }}>
                                <div><img src={STATIC_FILES.mailsaas_logo_32}></img>
                                    <span style={{ color: 'black', fontSize: '20px' }}>MailSaaaS</span></div>
                            </div>
                        </Col>
                        <Col >
                            <h1 style={{ textAlign: 'center', fontSize: '60px', color: "#333333" }}>New Campaign</h1>
                        </Col>
                        <Col style={{ display: "flex", flexDirection: "row-reverse" }}>
                            <div className='mt-3'>
                                <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                    <span><i className="fa fa-question-circle-o fa-lg" aria-hidden="true"></i></span>
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ width: '100%', borderBottom: "1px solid #dedede" }}>
                        <Col style={{ display: "flex" }}><Nav className='mx-auto' navbar>
                            <Row className='mx-auto' style={{ width: '100%' }}>
                                <ul style={{ listStyleType: 'none', display: 'flex' }}>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignStart">START</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignRecipient">RECIPICIENT</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignCompose">COMPOSE</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignPreview">PREVIEW</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignOptions">OPTIONS</Link></li>
                                    <li className='mr-3 ml-3'><Link to="/app/admin/CampaignSend">SEND</Link></li>
                                </ul>
                            </Row>
                        </Nav>
                        </Col>
                    </Row>
                    <Row className="option_note">Tweak how your campaign will be sent</Row>
                    <Row>
                        <Form onSubmit={this.handleSubmit}>
                            <Col md="6" className="mx-auto">
                                <Row>
                                    <div >
                                        <input id="1" type="checkbox" value={this.state.trackopen} name='trackopen' defaultChecked={this.state.trackopen} onChange={this.handleChange}></input>&nbsp;
                                    <span className="track_option">Track opens</span><br />
                                        <input id="2" type="checkbox" name='tracklinkclicks' defaultChecked={this.state.tracklinkclicks} onChange={this.handleChange}></input>
                                        <span className="track_line">Track Link clicks</span><br />
                                        <input id="3" type="checkbox" name='schedulesend' defaultChecked={this.state.schedulesend} onChange={this.handleChange}></input>
                                        <span className="schedule">Schedule this send</span>
                                    </div>
                                </Row>
                                <Row>
                                    <div className="time_container">
                                        <span className="sending_calendar">Sending calendar timezone</span><br />
                                        <span className="time_zone">Asia/Calcutta</span><br />
                                    </div>
                                </Row>
                                {/* <Row>
                            <DateTime  name='date' value={this.state.date} onChange={this.D}/>
                                </Row> */}
                                <Row style={{ marginLeft: "2px" }}>
                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                        <input type="date" className="date_picker" name='date' value={this.state.date} onChange={this.handleDate} />
                                        <input type="time" className="time_picker" name='time' value={this.state.time} onChange={this.handleTime} /><br />
                                    </div>
                                </Row>
                                <Row className="Leadcatcher_settingdiv">
                                    <span className="leadcatchersetting_icon"><i className="fa fa-caret-down"></i></span>
                                    <span className="leadcatchersetting">Lead Catcher setting</span>
                                </Row>
                                <Row>
                                    <span className="about_leadcatcher">ABOUT LEAD CATCHER</span>
                                    <span className="about_leadcatchericon"><i className="fa fa-question-circle-o" aria-hidden="true"></i></span><br />
                                    <span className="leadcatcher_note">Follow-up emails stop when a recipient becomes a lead, and leads are collected in one place so you can efficiently respond or take action.</span>
                                </Row>
                                <Row className="select_boxdiv">
                                    <div>
                                        <label className="selectbox_label">Who should leads be assigned to?</label><br />
                                        <select className="select_box" defaultValue={'me'}>
                                            <option value="me">me</option>
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
                                                        <option value="" >Replies</option>
                                                        <option value="" >Opens</option>
                                                        <option value="" >Click any link</option>
                                                        <option value="" >Click apecific link</option>
                                                    </select>
                                                    {/* </span> */}
                                                    {/* <span className="numberof_replieslabel"># of times</span> */}
                                                    {/* <span className="numberof_repliesinput"> */}
                                                    <input type="text" />
                                                    {/* </span> */}
                                                    <span className="delete_icon"><i className="fa fa-trash"></i></span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </Row>
                                <Row>
                                    <span><i className="fa fa-caret-down"></i></span>
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
                                    <span><i className="fa fa-slack"></i></span>
                                    <span>Extern Labs</span>
                                </Row>
                                <Row>
                                    <div>
                                        <input type="checkbox" name='termsandlaws' defaultChecked={this.state.termsandlaws} onClick={this.handleChange} />
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
        )
    }
}

const mapStateToProps = (state) => {
    return {

    };
};
const mapDispatchToProps = dispatch => ({
    CampaignOptionAction: optionData => {
        dispatch(CampaignOptionAction(optionData));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignOption)