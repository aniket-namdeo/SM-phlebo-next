"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import Image from "next/image";
import "/public/css/login.css";

export default function Login() {
  return (
    <>
      <section className="login">
        <div className="box">
          <Container>
            <Row>
              <Col>
                <Image
                  src="/images/logo-icon.png"
                  width={70}
                  height={70}
                  alt="Phlebo"
                  className="logo"
                />
                <h1 className="heading">Log In</h1>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Password"
                      className="mb-3"
                    />
                    <Link href="#">Forgot Password?</Link>
                  </Form.Group>
                  <div className="text-center">
                    <Button className="btn web-btn">Log In</Button>
                  </div>
                </Form>
                <div className="login-with">
                  <p>Log In with</p>
                  <ul>
                    <li>
                      <Link href={"#"}>
                        <Image
                          src="/images/facebook-icon.svg"
                          width={40}
                          height={40}
                          alt=""
                        />
                      </Link>
                    </li>
                    <li>
                      <Link href={"#"}>
                        <Image
                          src="/images/google-icon.svg"
                          width={40}
                          height={40}
                          alt=""
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="login-footer text-center">
          <p className="m-0">
            Don't have an account? <Link href={"#"}>Sign Up</Link>
          </p>
        </div>
      </section>
    </>
  );
}
