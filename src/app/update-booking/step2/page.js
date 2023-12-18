"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { HiOutlineMinusSm } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import Table from "react-bootstrap/Table";
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
              <div className="web-box">
                <h2 className="box-heading">Order Details</h2>
                <div className="box-body">
                  <Form>
                    <div className="info-box mb-3">
                      <p>
                        <span>Primary User Name:</span>
                        <br /> User Name
                      </p>
                      <p>
                        <span>Primary User Age</span>
                        <br /> 28
                      </p>
                    </div>
                    <Form.Group className="mb-3">
                      <p className="mb-0">VIP Membership</p>
                      <Form.Label>Rs 499 80% off - Rs 99 - 1 Year</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder=""
                        className="page-form-control"
                      />
                    </Form.Group>

                    <p className="mb-0">Selected Package(s)</p>
                    <div className="text-right mb-3">
                      <Link href={"#"}>Edit Packages</Link>
                    </div>
                    <div className="selected-packages mb-3">
                      <p className="text-secondary mb-2">
                        <small>
                          Advance Plus Full Body Checkup(Within 15 Hrs)
                        </small>
                      </p>
                      <p className="mb-0">2099</p>
                      <Link href={"#"} className="delete-btn btn btn-danger">
                        <HiOutlineMinusSm />
                      </Link>
                    </div>
                    <div className="selected-packages mb-3">
                      <p className="text-secondary mb-2">
                        <small>
                          Advance Plus Full Body Checkup(Within 15 Hrs)
                        </small>
                      </p>
                      <p className="mb-0">2099</p>
                      <Link href={"#"} className="delete-btn btn btn-danger">
                        <HiOutlineMinusSm />
                      </Link>
                    </div>

                    <div className="text-center">
                      <Link href={"#"} className="text-danger">
                        Tube Details
                      </Link>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="web-box">
                <h2 className="box-heading">Order Summary</h2>
                <div className="box-body">
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Price</td>
                        <th>2099</th>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <th>-189</th>
                      </tr>
                      <tr>
                        <td>VIP Membership Discount</td>
                        <th>-210.00</th>
                      </tr>
                      <tr>
                        <td>Price After Discount</td>
                        <th>1700</th>
                      </tr>
                      <tr>
                        <td>Amount to be taken from customer</td>
                        <th>Already Paid</th>
                      </tr>
                    </tbody>
                  </Table>
                  <Link href={"#"} className="btn web-stroke-btn w-100">
                    <FaPlus />
                    Select Coupon
                  </Link>
                </div>
              </div>
              <Link href={"step3"} className="btn web-btn w-100">
                Next
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
