"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import { MdQrCodeScanner } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { IoCameraOutline } from "react-icons/io5";
import "/public/css/package-attachment-details.css";
import PageHeader from "../../component/page-header";
import blobToBase64 from 'blob-to-base64';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBookingDetails } from '@/api_calls/LabPackageBookingDetails';
import { UpdateBookingMemberDetails } from '@/api_calls/UpdateBookingMemberDetails';
import { LabPackages } from '@/api_calls/LabPackages';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import SignaturePad from '@/components/SignaturePad';
import BarcodeReader from '@/components/BarcodeReader';

export default function PackageAttachmentDetails() {

  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [signatureData, setSignatureData] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [packageBookingTubeDetails, setPackageBookingTubeDetails] = useState({});

  const handleBarcodeScanned = (barcode) => {
    console.log('Barcode scanned:', barcode);
    setScannedBarcode(barcode);
  };


  const handleSignatureChange = (data) => {
    setSignatureData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(packageBookingTubeDetails);
    //const otpAPI = await UpdateBookingMemberDetails(userPackageBooking.id,userPackageBooking); 
  };

  return (
    <>
      <PageHeader heading="Package Attachment Details" />
      <section className="section-padding">
        <Container>
          <Row>
            <Col>
            <Form onSubmit={handleSubmit}>
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
                      <Form.Select 
                      className="page-form-control"
                      value={packageBookingTubeDetails.status}
                      onChange={(e) => setPackageBookingTubeDetails({ ...packageBookingTubeDetails, status: e.target.value })}
                      >
                        <option>Select</option>
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
                          value={scannedBarcode}
                          onChange={(e) => setPackageBookingTubeDetails({ ...packageBookingTubeDetails, barcode_no: e.target.value })}
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
                    <div>
                      <h2 className="box-heading">Barcode Reader</h2>                   
                      <BarcodeReader onBarcodeScanned={handleBarcodeScanned} />
                    </div>
                    {/* <div className="text-center">
                      <Link href={"#"}>Update Barcode</Link>
                    </div> */}
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Control
                  type="file"
                  required
                  name="imageFile"
                  accept='.jpg, .jpeg, .png, .pdf'
                  className='html-to-mui'
                  onChange={(e) => {
                      if (e.target.files) {
                          const file = e.target.files[0];
                          blobToBase64(file, function (error, base64) {
                              const parts = base64.split(';base64,');
                              const imageType = parts[0].split(':')[1];
                              const decodedData = parts[1];
                              console.log(decodedData);
                              setImageFile(decodedData);
                            });
                            setPackageBookingTubeDetails({ ...packageBookingTubeDetails, image: imageFile })
                      }
                  }}
                  ></Form.Control>
                  {/* <Form.Label for="uploadpicture" className="custom-file-upload">
                    <IoCameraOutline />
                    <br /> Click Sample Photo
                  </Form.Label> */}
                </Form.Group>

                <Link href={"#"} className="btn web-stroke-btn w-100" onClick={handleSubmit}>
                  {/* <FaPlus /> */}
                  Submit
                </Link>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
