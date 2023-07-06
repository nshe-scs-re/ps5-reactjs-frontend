import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import nevada_logo from './nevada_logo.png';

import {

  Row,
  Navbar,
  NavbarBrand,
  Image,

} from 'react-bootstrap';

import { RTT, RTTProps, RTTTestParams } from "./Tests/RTT";
import { Throughput } from "./Tests/Throughput";

declare global {
  interface Window {
      WebSocketURL: any;
  }
}


export default function App() {
  return (
    <Routes >
      <Route path="/" element={<Layout />}>
        <Route index element={<RTT />} />
        <Route path="/throughput" element={<Throughput />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <Container fluid="md">
      <Row>
        <Navbar>
          <NavbarBrand>
            <Image src={nevada_logo}></Image>&nbsp;
            Research Computing
          </NavbarBrand>
          <ul className="nav justify-content-center">

            <li className="nav-item">
              <Link className="nav-link active" to="/">RTT Test</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to="/throughput">Throughput Test</Link>
            </li>

          </ul>
        </Navbar>
      </Row>
      <Outlet />
    </Container>
  );
}

