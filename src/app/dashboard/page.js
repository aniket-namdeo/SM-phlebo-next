"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import "/public/css/dashboard.css";
import PageHeader from "../component/page-header";
import Footer from "../component/footer";

export default function updatebooking() {
  return (
    <>
      <PageHeader heading="Phlebo Dashboard" />
      <section className="dashboard section-padding">
        <Container>
          <Row>
            <Col className="col-6">
              <Link href={"#"} className="dash-box">
                <div className="box-body">
                  <h2 className="number">91</h2>
                  <p>Assigned Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Today - 13</p>
                </div>
              </Link>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">74</h2>
                  <p>Confirmed Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Today - 07</p>
                </div>
              </div>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">06</h2>
                  <p>Hold Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Today - 04</p>
                </div>
              </div>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">02</h2>
                  <p>Pending Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Today - 02</p>
                </div>
              </div>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">90</h2>
                  <p>Add on Amount</p>
                </div>
                <div className="box-footer">
                  <p>Today - 00</p>
                </div>
              </div>
            </Col>
            <Col className="col-6">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">20</h2>
                  <p>New Bookings</p>
                </div>
                <div className="box-footer">
                  <p>Today - 00</p>
                </div>
              </div>
            </Col>
            <Col className="col-12">
              <div className="dash-box">
                <div className="box-body">
                  <h2 className="number">00</h2>
                  <p>Cash Due</p>
                </div>
                <div className="box-footer">
                  <p>Today - 00</p>
                </div>
              </div>
            </Col>
            <Col className="col-12">
              <div className="dash-box total">
                <div className="box-body">
                  <h2 className="number">&#8377;1750</h2>
                  <p>Total Cash Due</p>
                </div>
              </div>
            </Col>
            <Col className="col-12">
              <p className="mt-2 mb-0 text-center">
                <span className="web-clr">Note:</span> Dashboard will be updated
                in every 30 minutes.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}
