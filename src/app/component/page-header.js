"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiArrowBack } from "react-icons/bi";
import "/public/css/pending-booking.css";
import { useRouter } from "next/navigation";

export default function PageHeader(props) {
  const router = useRouter();
  function goback() {
    router.back();
  }
  return (
    <>
      <section className="page-heading">
        <Container>
          <Row>
            <Col>
              <h1 className="page-heading">
                <div onClick={goback} className="icon">
                  <BiArrowBack />
                </div>
                {props.heading}
              </h1>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
