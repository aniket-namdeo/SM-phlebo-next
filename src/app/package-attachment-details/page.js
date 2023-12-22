"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { MdQrCodeScanner } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import "/public/css/update-booking.css";
import PageHeader from "../component/page-header";

export default function PackageAttachmentDetails() {
  return (
    <>
      <PageHeader heading="Package Attachment Details" />
      <section className="update-booking section-padding">
        <Container>
          <Row>
            <Col>
              <div className="web-box">
                <h2 className="box-heading">Tube Details</h2>
                <div className="box-body">
                  <div className="info-box mb-3">
                    <p>
                      <span>Name:</span>
                      <br /> EDTA Lavender top -13 mL
                    </p>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>Sample Status*</Form.Label>
                    <Form.Select className="page-form-control">
                      <option>Picked</option>
                      <option>Not Picked</option>
                      <option>Pending</option>
                      <option>Hold</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Scanned Value</Form.Label>
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
                  <div className="text-center">
                    <Link href={"#"}>Update Barcode</Link>
                  </div>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  placeholder=" "
                  className="page-form-control"
                  id="uploadpicture"
                  hidden
                ></Form.Control>
                <Form.Label for="uploadpicture" className="custom-file-upload">
                  <IoCameraOutline />
                  <br /> Click Sample Photo
                </Form.Label>
              </Form.Group>

              <Link href={"#"} className="btn web-stroke-btn w-100">
                <FaPlus />
                Add More Tube
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
