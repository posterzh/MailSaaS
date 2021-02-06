import React,{useState} from 'react'
import { Container, Row, Col } from 'reactstrap'
import NewCampaign_recipients from "../dashboards/NewCampaign_recipients"

export default function NewCampaign_start() {
    // const [state1, setstate1] = useState(false)  
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var d = new Date();
    let m=d.getMonth();
    let date= d.getDate();
    let month = months[m];
    console.log(date, month ,"hiii")

    return (
        <div>
                 <div style={{ height: '100%', width: '100%' }}>
                    <Container fluid>
                        <Row >
                            <Col md='5' className='mx-auto mt-5'>
                                <Row style={{ display: 'flex', justifyContent: 'center' }} >
                                    <h1 style={{ fontSize: '30px', textAlign: 'center',color:"#333333" }}> Let's get started</h1>
                                </Row>
                                <Row className='mt-5'>
                                    <div className="campaign-form" style={{ width: '100%' }}> <label>TItle (for your team's eyes only)</label><br></br>
                                        <input defaultValue={month+" "+date + " " +"Outreach"} type='text' className='start_input'></input></div>
                                </Row>
                                <Row className='mt-5'>
                                    <div style={{ width: '100%' }}> <label>From Address</label><br></br>
                                        <select className='start_input'>
                                            <option value='value'>Values</option>
                                        </select></div>
                                </Row>
                                <Row className='mt-5'>
                                    <Col style={{display:"flex",justifyContent:"center"}}>
                                        <button className='btn startBtn'>Next <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
        </div>
    )
}