"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { MdQrCodeScanner } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import "/public/css/sample-handover.css";
import PageHeader from "../component/page-header";

export default function samplehandover() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <PageHeader heading="Sample Handover" />
      <section className="sample-handover section-padding">
        <Container>
          <Row>
            <Col>
              <Button
                className="btn web-stroke-btn w-100 mb-3"
                onClick={handleShow}
              >
                <FaPlus /> Click To Add Bookings
              </Button>

              <Offcanvas
                show={show}
                onHide={handleClose}
                placement="bottom"
                className="sample-handover-modal"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Add Bookings</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form.Group className="mb-3 custom-checkbox">
                    <Form.Control
                      type="checkbox"
                      name="bookings"
                      id="booking1"
                      hidden
                    />
                    <Form.Label className="sample-booking-box" for="booking1">
                      <p>
                        <span>Name:</span> <br /> User Name
                      </p>
                      <p>
                        <span>Number:</span> <br /> 0123456789
                      </p>
                      <p>
                        <span>Package Name</span> <br /> XYZ
                      </p>
                      <p>
                        <span>Package Detail</span> <br /> XYZ
                      </p>
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="mb-3 custom-checkbox">
                    <Form.Control
                      type="checkbox"
                      name="bookings"
                      id="booking2"
                      hidden
                    />
                    <Form.Label className="sample-booking-box" for="booking2">
                      <p>
                        <span>Name:</span> <br /> User Name
                      </p>
                      <p>
                        <span>Number:</span> <br /> 0123456789
                      </p>
                      <p>
                        <span>Package Name</span> <br /> XYZ
                      </p>
                      <p>
                        <span>Package Detail</span> <br /> XYZ
                      </p>
                    </Form.Label>
                  </Form.Group>
                  <Button className="btn web-btn w-100">Confirm</Button>
                </Offcanvas.Body>
              </Offcanvas>

              <div className="sample-booking-box mb-3">
                <p>
                  <span>Name:</span> <br /> User Name
                </p>
                <p>
                  <span>Number:</span> <br /> 0123456789
                </p>
                <p>
                  <span>Package Name</span> <br /> XYZ
                </p>
                <p>
                  <span>Package Detail</span> <br /> XYZ
                </p>
              </div>

              <div className="sample-booking-box mb-3">
                <p>
                  <span>Name:</span> <br /> User Name
                </p>
                <p>
                  <span>Number:</span> <br /> 0123456789
                </p>
                <p>
                  <span>Package Name</span> <br /> XYZ
                </p>
                <p>
                  <span>Package Detail</span> <br /> XYZ
                </p>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Select Receiver Type:</Form.Label>
                <Form.Select className="page-form-control">
                  <option>Labs</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Given to</Form.Label>
                <div className="d-flex align-items-center justify-content-between gap-3">
                  <Form.Control
                    type="text"
                    placeholder=" "
                    className="page-form-control"
                  />
                  <Link href={"#"} className="scan text-center">
                    <MdQrCodeScanner />
                    <br />
                    Scan
                  </Link>
                </div>
              </Form.Group>
              <Link href={"#"} className="text-center mb-3 d-block">
                Take sample receivers signature
              </Link>
              <Link href={"#"} className="btn web-btn w-100">
                Submit
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
