"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { FaPlus } from "react-icons/fa6";
import "/public/css/update-booking.css";
import PageHeader from "../component/page-header";

export default function updatebooking() {
  return (
    <>
      <PageHeader heading="Update Booking" />
      <section className="update-booking section-padding">
        <Container>
          <Row>
            <Col>
              <div className="web-box">
                <h2 className="box-heading">Patient Details</h2>
                <div className="box-body">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Solution*</Form.Label>
                      <Form.Select className="page-form-control">
                        <option>Mr</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Name*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        className="page-form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Age*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Age"
                        className="page-form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender*</Form.Label>
                      <Form.Select className="page-form-control">
                        <option>Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </Form.Select>
                    </Form.Group>

                    <div className="info-box mt-3 mb-3">
                      <p>
                        <span>Collection Date</span>
                        <br /> 2023-11-21
                      </p>
                      <p>
                        <span>Collection Time</span>
                        <br /> 06:00:00-07:00:00
                      </p>
                      <p>
                        <span>Mobile Number</span>
                        <br /> XXXXXX8762
                      </p>
                      <p>
                        <span>Whatsapp Number</span>
                        <br /> XXXXXX8762
                      </p>
                      <p>
                        <span>Alternative Number</span>
                        <br /> XXXXXX8762
                      </p>
                    </div>
                    <Form.Group className="mb-3">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        className="page-form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Aadhaar Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter Aadhaar Number"
                        className="page-form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Passport Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter Passport Number"
                        className="page-form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>House No./Plot No./Flat No.*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter House No."
                        className="page-form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Appartment/Building/Colony/Block*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Appartment"
                        className="page-form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Landmark/Sublocality*</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Landmark"
                        style={{ height: "80px" }}
                        className="page-form-control"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Locality*</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Locality"
                        style={{ height: "80px" }}
                        className="page-form-control"
                      />
                    </Form.Group>

                    <div className="mb-3 text-center">
                      <Link href={"#"}>Get direction to customer</Link>
                    </div>

                    <p className="text-danger mb-3 text-center">
                      *Location updated on 11/18/2023 at 9:10 AM
                    </p>
                  </Form>
                </div>
              </div>
              <Link href={"#"} className="btn web-stroke-btn mb-3 w-100">
                <FaPlus />
                Add Family Member
              </Link>

              <Link href={"update-booking/step2"} className="btn web-btn w-100">
                Next
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
