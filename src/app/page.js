"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import "/public/css/splash.css";

export default function Login() {
  return (
    <>
      <section className="splash">
        <Container>
          <Row>
            <Col>
              <h1 className="heading">Phlebo</h1>

              <div className="splash-footer">
                <Link href={"login"} className="btn white-btn">
                  Log In
                </Link>
                {/* <Link href={"#"} className="btn white-stroke-btn">
                  Sign up
                </Link> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
