import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap'

function Addresstable() {
    return (
        <div>
            <Container fluid >
                <Row>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th className="Email">Email</th>
                                <th className="name">Name</th>
                                <th className="IsAdmin">UNSUBSCRIBE DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='' >
                                <td className="name-value">Omaid Faizyar</td>
                                <td className="Email-value">omaid@faizyar.com</td>
                                <td className="IsAdmin-value">Yes</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>

        </div>
    )
}

export default Addresstable
