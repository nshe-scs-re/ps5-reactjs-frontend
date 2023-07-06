import * as React from "react";
import Container from 'react-bootstrap/Container';

import {
    Card,
    Col,
    Row,
    Button,
    Form,
    FormGroup,
} from 'react-bootstrap';

export interface ThroughputProps {
    duration: number;
    bandwidth: number;
    interval: number;
    protocol: string;
    reverse: boolean;
    source?: string;
    destination?: string;
}

export interface IThroughputTestForm {
    sources: string[],
    destinations: string[],
    props: ThroughputProps;
    children?: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

export const ThroughputTestParams = (throughputParamsForm: IThroughputTestForm) => {

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        throughputParamsForm.onChange(e);
    }

    return (
        <>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <Form.Label>Source:</Form.Label>
                        <Form.Select name='source' onChange={handleChange}>
                            <option value=""></option>
                            {throughputParamsForm.sources.map((value, index) => <option key={value} value={value} >{value}</option>)}
                        </Form.Select>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <Form.Label>Destination:</Form.Label>
                        <Form.Select name='destination' onChange={handleChange}>
                            <option value=""></option>
                            {throughputParamsForm.sources.map((value, index) => <option key={value} value={value} >{value}</option>)}
                        </Form.Select>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <FormGroup>
                        <Form.Label>Bandwidth (Mbit/s):</Form.Label>
                        <Form.Control
                            name='count'
                            type='text'
                            onChange={handleChange}
                            value={throughputParamsForm.props.bandwidth}
                        >
                        </Form.Control>
                    </FormGroup>
                </Col>
            </Row>
        </>
    );
}

export const Throughput = () => {
    const [sources, setSources] = React.useState([
        'scs-reno-ixp-th0.nevada.net',
        'scs-reno-re-9300x.nevada.net'
    ])
    const [destinations, setDestinations] = React.useState([
        'scs-reno-ixp-th0.nevada.net',
        'scs-reno-re-9300x.nevada.net'
    ])

    const [throughputProps, setThroughputProps] = React.useState<ThroughputProps>({
        duration: 20,
        bandwidth: 1000,
        interval: 1,
        protocol: 'tcp',
        reverse: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        //Might need to cast types
        setThroughputProps({
            ...throughputProps,
            [e.target.name]: e.target.value
        })
    }

    const submitTest = () => {
        //Clear output
        let message = JSON.stringify(throughputProps);
        //Send message
    }

    return (
        <Container>
            <Row>
                <Col className="col-sm-6">
                    <h2>perfSONAR Throughput Test</h2>
                    <Form>
                        <Container>
                            <ThroughputTestParams
                                sources={sources}
                                destinations={destinations}
                                props={throughputProps}
                                onChange={handleChange}>

                            </ThroughputTestParams>
                            <Row className="mt-2">
                                <Col>
                                    <Button onClick={submitTest}>Submit</Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Col>
                <Col className="col-sm-6">
                    <h2>Results</h2>
                </Col>
            </Row>
        </Container>
    );
}