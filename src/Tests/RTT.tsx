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

export interface RTTProps {
    count: string;
    packetSize: string;
    interval: string;
    ttl: string;
    deadline: string;
    timeout: string;
    ipVersion: string;
    protocol: string;
    doNotFragment: boolean;
    source?: string;
    destination?: string;
}

export interface IRTTParamsForm {
    sources: string[],
    destinations: string[],
    props: RTTProps;
    children?: React.ReactNode;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

export const RTTTestParams = (rttParamsForm: IRTTParamsForm) => {
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        rttParamsForm.onChange(e);
    }

    return (
        <>
            <Row>
                <Col xs={6}>
                    <FormGroup>
                        <Form.Label>Source:</Form.Label>
                        <Form.Select name='source' onChange={handleChange}>
                            <option value=""></option>
                            {rttParamsForm.sources.map((value, index) => <option key={value} value={value} >{value}</option>)}
                        </Form.Select>
                    </FormGroup>
                </Col>
                <Col xs={6}>
                    <FormGroup>
                        <Form.Label>Destination:</Form.Label>
                        <Form.Select name='destination' onChange={handleChange}>
                            <option value=""></option>
                            {rttParamsForm.sources.map((value, index) => <option key={value} value={value} >{value}</option>)}
                        </Form.Select>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col xs={3}>
                    <FormGroup>
                        <Form.Label>Count:</Form.Label>
                        <Form.Control
                            name='count'
                            type='text'
                            onChange={handleChange}
                            value={rttParamsForm.props.count}
                        >

                        </Form.Control>
                    </FormGroup>
                </Col>
                <Col xs={3}>
                    <FormGroup>
                        <Form.Label>Packet Size:</Form.Label>
                        <Form.Control
                            name='packetSize'
                            onChange={handleChange}
                            value={rttParamsForm.props.packetSize}></Form.Control>
                    </FormGroup>
                </Col>
                <Col xs={3}>
                    <FormGroup>
                        <Form.Label>Interval:</Form.Label>
                        <Form.Control
                            name='interval'
                            onChange={handleChange}
                            value={rttParamsForm.props.interval}></Form.Control>
                    </FormGroup>
                </Col>
                <Col xs={3}>
                    <FormGroup>
                        <Form.Label>Timeout:</Form.Label>
                        <Form.Control
                            name='timeout'
                            onChange={handleChange}
                            value={rttParamsForm.props.timeout}></Form.Control>
                    </FormGroup>
                </Col>
            </Row>

            <Row>
                <Col>
                    <FormGroup>
                        <Form.Label>Do not Fragment:</Form.Label>
                        <Form.Check></Form.Check>
                    </FormGroup>
                </Col>
            </Row>
        </>
    )
}

interface ITestOutput {
    output: string;
    children?: React.ReactNode;
}

const TestOutput = (testOutput: ITestOutput) => {
    return (
        <Card>
            <pre className="output-card p-2">
                {testOutput.output}
            </pre>
        </Card>
    )
}


export const RTT = () => {
    const [sources, setSources] = React.useState([
        'scs-reno-ixp-th0.nevada.net',
        'scs-reno-re-9300x.nevada.net'
    ])
    const [destinations, setDestinations] = React.useState([
        'scs-reno-ixp-th0.nevada.net',
        'scs-reno-re-9300x.nevada.net'
    ])
    const [output, setOutput] = React.useState('');
    const ws = React.useRef<WebSocket | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setRTTProps({
            ...rttProps,
            [e.target.name]: e.target.value
        })
    }

    const [rttProps, setRTTProps] = React.useState<RTTProps>({
        count: '1',
        packetSize: '1500',
        interval: '1',
        deadline: '20',
        protocol: 'icmp',
        timeout: '5',
        ttl: '64',
        ipVersion: '4',
        doNotFragment: false,
    })

    const submitTest = () => {
        setOutput('');
        let message = JSON.stringify(rttProps);
        ws.current?.send(message);
    }

    React.useEffect(() => {

        ws.current = new WebSocket(window.WebSocketURL);

        ws.current.onopen = () => console.log("ws opened");
        ws.current.onclose = () => console.log("ws closed");

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, [])

    React.useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = (ev: MessageEvent<any>): any => {
            const newOutput = output + ev.data;
            setOutput(newOutput);
        };
    }, [output]);


    return (
        <Container>
            <Row>
                <Col className="col-sm-6">
                    <h2>perfSONAR RTT Test</h2>
                    <Form>
                        <Container>
                            <RTTTestParams
                                sources={sources}
                                destinations={destinations}
                                props={rttProps}
                                onChange={handleChange}>

                            </RTTTestParams>
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
                    <TestOutput output={output}>
                    </TestOutput>
                </Col>
            </Row>
        </Container>
    );
}