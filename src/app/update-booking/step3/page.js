"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { MdQrCodeScanner } from "react-icons/md";
import "/public/css/update-booking.css";
import PageHeader from "../../component/page-header";

export default function step2() {
  return (
    <>
      <PageHeader heading="Update Booking" />
      <section className="update-booking section-padding">
        <Container>
          <Row>
            <Col>
              <div className="text-center mb-3">
                <Link href={"#"}>Take Customer Signature</Link>
              </div>
              <div className="web-box">
                <h2 className="box-heading">Master Barcode Value</h2>
                <div className="box-body">
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
                </div>
              </div>
              <div className="web-box">
                <h2 className="box-heading">Pickup Status*</h2>
                <div className="box-body">
                  <Form.Select className="page-form-control">
                    <option>Picked</option>
                    <option>Not Picked</option>
                    <option>Pending</option>
                    <option>Hold</option>
                  </Form.Select>
                </div>
              </div>
              <div className="web-box">
                <h2 className="box-heading">Payment Details</h2>
                <div className="box-body">
                  <Form.Group className="mb-3">
                    <Form.Label>Receivable Amount*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="page-form-control"
                    />
                  </Form.Group>
                  <div className="text-center mb-3">
                    <Link href={"#"}>Get Payment Info</Link>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>Happy Code*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      className="page-form-control"
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Customer Feedback*</Form.Label>
                    <Form.Select className="page-form-control">
                      <option>Choose Customer Feedback</option>
                    </Form.Select>
                  </Form.Group>
                </div>
              </div>

              <Link href={"#"} className="btn web-btn w-100">
                Update Booking Details
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
