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
import { LabBookingTubeDetails } from '@/api_calls/LabBookingTubeDetails';
import { UpdateBookingTubeDetails } from '@/api_calls/UpdateBookingTubeDetails';
import { TubeMasterList } from '@/api_calls/TubeMasterList';
import { LabPackages } from '@/api_calls/LabPackages';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import SignaturePad from '@/components/SignaturePad';
import BarcodeReader from '@/components/BarcodeReader';
import Swal from 'sweetalert2';

export default function PackageAttachmentDetails() {

  const router = useRouter();

  const searchParams = useSearchParams();
  const [userPackageBooking, setUserPackageBooking] = useState({});
  const [labPackages, setLabPackages] = useState([]);
  const [slots, setSlots] = useState({});
  const [selectedDate, setSelectedDate] = useState(''); 


  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [signatureData, setSignatureData] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [packageBookingTubeDetails, setPackageBookingTubeDetails] = useState({});
  const [tubeTypes, setTubeTypes] = useState([]);

  const [statusOptions, setStatusOptions] = useState([
    'Picked',
    'NotPicked',
    'Pending',
    'Hold'
  ]);

  const handleBarcodeScanned = (barcode) => {
    console.log('Barcode scanned:', barcode);
    setScannedBarcode(barcode);
  };

  const [snack, setSnack] = useState({
    open: false,
      message: ''
  });
  const snackClose = () => {
      setSnack({
          open: false,
          message: ''
      });
  };



  const handleSignatureChange = (data) => {
    setSignatureData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log(packageBookingTubeDetails);
    console.log(userPackageBooking.id);
    const { status } = packageBookingTubeDetails;
    if (!status.trim()) {
        Swal.fire({
          title: 'Error',
          text: 'All required fields must be filled.',
          icon: 'error',
        });
    } else {
      const otpAPI = await UpdateBookingTubeDetails(packageBookingTubeDetails.tube_id,userPackageBooking.id,packageBookingTubeDetails); 
      if(otpAPI.status == 200){    
        setSnack({
            open: true,
            message: 'Successfully Update Tube Details.'
        });
        router.push('/update-booking/step2?id='+userPackageBooking.id);
      }else{
        setSnack({
            open: true,
            message: 'Something Wrong.'
        });
      }
    }
    
  };

  useEffect(() => {
    const id = searchParams.get('id');
    const booking_id = searchParams.get('booking_id');

    async function fetchData() {
      try {
        const res = await LabPackageBookingDetails(booking_id);
        setUserPackageBooking(res);
      } catch (error) {
        console.error(error);
      }

      try {
        const res = await LabBookingTubeDetails(id);
        setPackageBookingTubeDetails(res);
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await TubeMasterList();
        console.log(response);
        setTubeTypes(response); // Assuming response.data is the array of tube types
      } catch (error) {
        console.error('Error fetching tube types:', error.message);
      }
    }
    fetchData();
  }, []);

  const tubeTypeChange = (val) => {
    console.log(val);
    setPackageBookingTubeDetails(prev => {
      return { ...prev, tube_type: val}
    });
  }

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
                        <br /> {userPackageBooking.name}
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
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Tube Type*</Form.Label>
                      <Form.Select 
                      className="page-form-control"
                      value={packageBookingTubeDetails.tube_type}
                      // onChange={(e) => setPackageBookingTubeDetails({ ...packageBookingTubeDetails, tube_type: e.target.value })}
                      onChange={(e) => tubeTypeChange(e.target.value)}                      
                      >
                        <option value="">Select Tube Type</option>
                        {tubeTypes && tubeTypes.length > 0 && tubeTypes.map((tubeType) => (
                          <option key={tubeType.id} value={tubeType.name}>
                            {tubeType.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Scanned Value</Form.Label>
                      <div className="d-flex align-items-center justify-content-between gap-3">
                        <Form.Control
                          type="text"
                          value={packageBookingTubeDetails.barcode_no ? packageBookingTubeDetails.barcode_no : scannedBarcode}
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
                <div>
                  {packageBookingTubeDetails.image ? (
                    <img
                      src={`http://127.0.0.1:8000/${packageBookingTubeDetails.image}`}
                      alt="Package Image"
                      style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '10px' }}
                    />
                  ) : null}
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
              
                        // Show the selected file in the image tag
                        setPackageBookingTubeDetails({ ...packageBookingTubeDetails, image: decodedData });
                      });
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
          <Snackbar
              open={snack.open}
              autoHideDuration={6000}
              onClose={snackClose}
              message={snack.message}
          />
        </Container>
      </section>
    </>
  );
}
