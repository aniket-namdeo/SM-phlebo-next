"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import "/public/css/pending-booking.css";
import PageHeader from "../component/page-header";
import Footer from "../component/footer";

export default function holdbooking() {
  return (
    <>
      <PageHeader heading="Hold Bookings" />
      <section className="pending-booking section-padding">
        <Container>
          <Row>
            <Col>
              <div className="web-box">
                <h2 className="box-heading">Mr. Chitransh Khare</h2>
                <div className="box-body">
                  <p>
                    <span>Booking ID:</span> <br /> 6234775
                  </p>
                  <p>
                    <span>Age:</span> <br /> 32
                  </p>
                  <p>
                    <span>Gender:</span> <br /> Male
                  </p>
                  <p>
                    <span>Email:</span> <br />
                    <Link href={"#"}>customer.report@redcliffelabs.com</Link>
                  </p>
                  <p>
                    <span>Collection Date:</span> <br /> 21 November 2023
                  </p>
                  <p>
                    <span>Collection Time:</span> <br /> 12:00:00 - 13:00:00
                  </p>
                  <p>
                    <span>Booking Amount:</span> <br /> 1079
                  </p>
                  <p>
                    <span>Amount Due:</span> <br /> 0
                  </p>
                  <p>
                    <span>Booking Status:</span> <br /> phlebo reached
                  </p>
                  <p>
                    <span>Booking Source:</span> <br /> Redcliffelabs
                  </p>
                  <Link href={"#"} className="btn web-btn w-100">
                    Button
                  </Link>
                </div>
              </div>
              <div className="web-box">
                <h2 className="box-heading">Mr. Chitransh Khare</h2>
                <div className="box-body">
                  <p>
                    <span>Booking ID:</span> <br /> 6234775
                  </p>
                  <p>
                    <span>Age:</span> <br /> 32
                  </p>
                  <p>
                    <span>Gender:</span> <br /> Male
                  </p>
                  <p>
                    <span>Email:</span> <br />
                    <Link href={"#"}>customer.report@redcliffelabs.com</Link>
                  </p>
                  <p>
                    <span>Collection Date:</span> <br /> 21 November 2023
                  </p>
                  <p>
                    <span>Collection Time:</span> <br /> 12:00:00 - 13:00:00
                  </p>
                  <p>
                    <span>Booking Amount:</span> <br /> 1079
                  </p>
                  <p>
                    <span>Amount Due:</span> <br /> 0
                  </p>
                  <p>
                    <span>Booking Status:</span> <br /> phlebo reached
                  </p>
                  <p>
                    <span>Booking Source:</span> <br /> Redcliffelabs
                  </p>
                  <Link href={"#"} className="btn web-btn w-100">
                    Button
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer page="hold" />
    </>
  );
}
