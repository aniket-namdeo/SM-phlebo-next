"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "/public/css/update-booking.css";
import PageHeader from "../../component/page-header";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBookingDetails } from '@/api_calls/LabPackageBookingDetails';
import { userDetailsByMobile } from '@/api_calls/userDetailsByMobile';
import { AddBookingsDetails } from '@/api_calls/AddBookingsDetails';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import { TubeMasterList } from '@/api_calls/TubeMasterList';
import { BankMasterList } from '@/api_calls/BankMasterList';
import { LabBookingTubeList } from '@/api_calls/LabBookingTubeList';
import BookingList from '@/components/BookingList';


import { LabPackages } from '@/api_calls/LabPackages';
import { ThyrocareSlot } from '@/api_calls/ThyrocareSlot';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function BookStep2() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userPackageBooking, setUserPackageBooking] = useState({});
  const [labPackages, setLabPackages] = useState([]);
  const [slots, setSlots] = useState([
    "06:00 - 06:30",
    "06:30 - 07:00",
    "07:00 - 07:30",
    "07:30 - 08:00",
    "08:00 - 08:30",
    "09:30 - 10:00",
    "10:00 - 10:30",
    "10:30 - 11:00",
    "11:00 - 11:30",
    "11:30 - 12:00",
    "12:00 - 12:30",
    "12:30 - 13:00",
    "13:00 - 13:30",
    "13:30 - 14:00"
  ]);
  const [selectedDate, setSelectedDate] = useState('');
  const [tubeTypes, setTubeTypes] = useState([]);
  const [banks, setBanks] = useState([]);
  const [tubes, setTubes] = useState([{ tubeType: '', barcodeNumber: '' }]);


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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(userPackageBooking);    
    //console.log(tubes);  
  if (userPackageBooking && userPackageBooking.booking_for && userPackageBooking.name && userPackageBooking.email && userPackageBooking.contact && userPackageBooking.age && userPackageBooking.pincode && userPackageBooking.user_address && userPackageBooking.slot_time && userPackageBooking.package_name) {
    const { booking_for, name, email, contact, age, pincode, user_address, slot_time, package_name } = userPackageBooking;

    if (!booking_for.trim() || !name.trim() || !email.trim() || !contact.trim() || !age.trim() || !pincode.trim() || !user_address.trim() || !slot_time.trim()  ||  !package_name.trim() ) {
        Swal.fire({
          title: 'Error',
          text: 'All required fields must be filled.',
          icon: 'error',
        });
    } else {
      const otpAPI = await AddBookingsDetails(userPackageBooking,tubes); 
      console.log(otpAPI);
      if(otpAPI.status == 200){
        console.log(otpAPI.status);      
        setSnack({
            open: true,
            message: 'Successfully Add Booking.'
        });
        router.push('/pending-booking');
      }else{
        setSnack({
            open: true,
            message: 'Something Wrong.'
        });
      }
    }
  } else {
    Swal.fire({
      title: 'Error',
      text: 'All required fields must be filled.',
      icon: 'error',
    });
  }
    
 

   
  };


  useEffect(() => {
    const mobileNo = searchParams.get('mobileNo');
    async function fetchData() {
      try {
        const lab_res = await LabPackages();
        setLabPackages(lab_res);
      } catch (error) {
        console.error(error);
      }
      try {
        const res = await userDetailsByMobile(mobileNo);
        setUserPackageBooking(res);
        console.log('userPackageBooking:', res);
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
      try {
        const response = await BankMasterList();
        console.log(response);
        setBanks(response); // Assuming response.data is the array of tube types
      } catch (error) {
        console.error('Error fetching bank types:', error.message);
      }
    }

    fetchData();
  }, []);

  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (event) => {
    // Update the selectedDate state when the date field changes
    setSelectedDate(event.target.value);
  };


  // Helper function to convert camelCase to Title Case
  const camelToTitleCase = (str) => {
    if (!str) {
      return '';
    }
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (char) => char.toUpperCase());
  };
  
  const packageChange = (val) => {
    const lab_package_obj = labPackages.filter(i => i.lab_package_id == val);
    console.log(lab_package_obj);
    setUserPackageBooking(prev => {
      return { ...prev, package_name: lab_package_obj[0].lab_package_name}
    });
    setUserPackageBooking(prev => {
      return { ...prev, package_price: lab_package_obj[0].package_price }
    }); 
    
    setUserPackageBooking(prev => {
      return { ...prev, package_mrp: lab_package_obj[0].package_mrp }
    });  ; 
    
    setUserPackageBooking(prev => {
      return { ...prev, package_id: lab_package_obj[0].lab_package_id }
    }); 

    setUserPackageBooking(prev => {
      return { ...prev, booking_date: '2023-12-28' }
    }); 

    setUserPackageBooking(prev => {
      return { ...prev, slot_time: '12:00 - 12:30' }
    }); 


    
    
  }
  
  const priceDifference = userPackageBooking.package_mrp - userPackageBooking.package_price;

  const handleAgeChange = (e) => {
    const age = parseInt(e.target.value, 10);

    if (!isNaN(age) && age > 120) {
      Swal.fire({
        title: 'Invalid Age',
        text: 'Age cannot be more than 120.',
        icon: 'error',
      });
      setUserPackageBooking({ ...userPackageBooking, age: '' });
    } else {
      setUserPackageBooking({ ...userPackageBooking, age: e.target.value });
    }
  };


  const handleTubeChange = (index, field, value) => {
    const newTubes = [...tubes];
    newTubes[index][field] = value;
    setTubes(newTubes);
  };

  const addTube = () => {
    setTubes([...tubes, { tubeType: '', barcodeNumber: '' }]);
  };

  const removeTube = (index) => {
    if (tubes.length > 1) {
      const newTubes = [...tubes];
      newTubes.splice(index, 1);
      setTubes(newTubes);
    }
  };

  const [paymentMethod, setPaymentMethod] = useState('CASH');

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };


  return (
    <>
      <PageHeader heading="Customer Details" />
      <section className="update-booking section-padding">
        <Form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Relation*</Form.Label>
                  <Form.Select
                    className="page-form-control"
                    value={userPackageBooking.booking_for}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, booking_for: e.target.value })}
                  >
                    <option>Select Relation</option>
                    <option value="Self">Self</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Sister">Sister</option>
                    <option value="Brother">Brother</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Name*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    className="page-form-control"
                    value={userPackageBooking.name}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, name: e.target.value })}
                  />
                </Form.Group>              
                <Form.Group className="mb-3">
                  <Form.Label>Gender*</Form.Label>
                  <Form.Select
                    className="page-form-control"
                    value={userPackageBooking.gender}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, gender: e.target.value })}
                  >
                    <option>Select Gender *</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile*</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Name"
                    className="page-form-control"
                    value={userPackageBooking.contact}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, contact: e.target.value })}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email*</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    className="page-form-control"
                    value={userPackageBooking.email}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, email: e.target.value })}
                  />
                </Form.Group> 
                <Form.Group className="mb-3">
                  <Form.Label>Age*</Form.Label>
                  <Form.Control
                    id="ageInput"
                    type="number"
                    placeholder="Age"
                    className="page-form-control"
                    value={userPackageBooking.age}
                    onChange={handleAgeChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Weight(Kg)"
                    className="page-form-control"
                    value={userPackageBooking.weight}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, weight: e.target.value })}
                  />
                </Form.Group>    
                <Form.Group className="mb-3">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Height(cm)"
                    className="page-form-control"
                    value={userPackageBooking.height}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, height: e.target.value })}
                  />
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Blood Group"
                    className="page-form-control"
                    value={userPackageBooking.blood_group}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, blood_group: e.target.value })}
                  />
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>Refer By Doctor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Refer By Doctor"
                    className="page-form-control"
                    value={userPackageBooking.ref_by_doc}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, ref_by_doc: e.target.value })}
                  />
                </Form.Group>  
                <Form.Group className="mb-3">
                  <Form.Label>Refer By Lab</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Refer By Lab"
                    className="page-form-control"
                    value={userPackageBooking.ref_by_lab}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, ref_by_lab: e.target.value })}
                  />
                </Form.Group>                 
                <Form.Group className="mb-3">
                  <Form.Label>Address*</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Landmark"
                    style={{ height: "80px" }}
                    className="page-form-control"
                    value={userPackageBooking.user_address}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, user_address: e.target.value })}
                  />
                </Form.Group>              
                <Form.Group className="mb-3">
                  <Form.Label>Pincode*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pincode"
                    className="page-form-control"
                    value={userPackageBooking.pincode}
                    onChange={(e) => setUserPackageBooking({ ...userPackageBooking, pincode: e.target.value })}
                  />
                </Form.Group>
            </Col>
          </Row>        
          <Row>
            <Col>
              <div className="web-box">
                <h2 className="box-heading">Order Details</h2>
                <div className="box-body">                             
                    <div>
                      <div>
                        <div>
                          <Form.Group className="mb-3">
                            <Form.Label>Chose Package*</Form.Label>
                            <Form.Select
                              className="page-form-control"
                              onChange={(e) => packageChange(e.target.value)}
                            >
                              <option>Select Package</option>
                              {/* Map over labPackages to generate options */}
                              {labPackages.map((labPackage) => (
                                <option key={labPackage.lab_package_id} value={labPackage.lab_package_id}>
                                  {labPackage.lab_package_name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <p className="mb-0">Selected Package(s)</p>
                            <Form.Group className="mb-3">
                              <p className="mb-0">Booking Date</p>
                              <Form.Control
                                type="date"
                                placeholder=""
                                className="page-form-control"
                                min={getCurrentDate()} 
                                onChange={handleDateChange} // Call handleDateChange on date field change
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <p className="mb-0">Booking Slot*</p>
                              <Form.Select name="Slot">
                                <option value="">Select Slot</option>
                                {slots.map((slot, index) => (
                                  <option key={index} value={slot}>
                                    {slot}
                                  </option>
                                ))}
                              </Form.Select>
                            </Form.Group>
                          </div>                          
                        </div>
                    </div>                    
                    
                </div>
              </div>
              <div className="web-box">
                <h2 className="box-heading">Tube Details</h2>
                <div className="box-body"> 
                  <div>
                    <p>Tubes</p>
                    {tubes.map((tube, index) => (
                      <div key={index}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tube Type</Form.Label>
                          <Form.Select
                            onChange={(e) => handleTubeChange(index, 'tubeType', e.target.value)}
                          >
                            {/* Map over tube types to generate options */}
                            {tubeTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Barcode Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter barcode number"
                            value={tube.barcodeNumber}
                            onChange={(e) => handleTubeChange(index, 'barcodeNumber', e.target.value)}
                          />
                        </Form.Group>
                        <button  className="btn web-stroke-btn mb-3 d-block"  type="button" onClick={() => removeTube(index)}>Remove Tube</button>
                      </div>
                    ))}
                    <button  className="btn web-stroke-btn mb-3 d-block"  type="button" onClick={addTube}>Add Tube</button>
                  </div>
                </div>
              </div>
              <div className="web-box">
                <h2 className="box-heading">payment Details</h2>
                <div className="box-body"> 
                  <div className="row">
                    <div className="form-group">
                      <label htmlFor="paymentMethod">Payment Method:</label>
                      <select
                        id="paymentMethod"
                        className="form-control"
                        name="paymentMethod"
                        onChange={handlePaymentMethodChange}
                        value={paymentMethod}
                      >
                        <option value="CASH">CASH</option>
                        <option value="CARD">CARD</option>
                        <option value="CHEQUE_DD">CHEQUE/DD</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="barcodeNumber">Cash Amount:</label>
                      <input type="text" className="form-control" name="cash_amount" />
                    </div>

                    <div className="form-group" style={{ display: paymentMethod === 'CARD' || paymentMethod === 'CHEQUE_DD' ? 'block' : 'none' }}>
                      <label htmlFor="paymentMethod">Select Bank</label>
                      <select name="bank" id="bank" className="form-control">
                        <option value="" disabled>Select a bank</option>
                        {banks.map((bank) => (
                          <option key={bank.id} value={bank.bank_name}>
                            {bank.bank_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group" style={{ display: paymentMethod === 'CARD' || paymentMethod === 'CHEQUE_DD' ? 'block' : 'none' }}>
                      <label htmlFor="paymentMethod">Cheque No./Card No.:</label>
                      <input type="text" className="form-control" name="cash" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="web-box">
                <h2 className="box-heading">Order Summary</h2>
                <div className="box-body">
                  <Table striped bordered hover>
                    <tbody>
                      <tr>
                        <td>Price</td>
                        <th>{userPackageBooking.package_mrp}</th>
                      </tr>
                      <tr>
                        <td>Discount</td>
                        <th>-{priceDifference}</th>
                      </tr>
                      <tr>
                        <td>Price After Discount</td>
                        <th>{userPackageBooking.package_price}</th>
                      </tr>
                      <tr>
                        <td>Payment Status</td>
                        <th>{camelToTitleCase(userPackageBooking.payment_status)}</th>
                      </tr>
                    </tbody>
                  </Table>
                  {/* <Link href={"#"} className="btn web-stroke-btn w-100">
                    <FaPlus />
                    Select Coupon
                  </Link> */}
                </div>
              </div>
              <Link href={"#"} className="btn web-stroke-btn mb-3 d-block" onClick={handleSubmit}>
                Submit
              </Link>
            </Col>
          </Row>
          <Snackbar
            open={snack.open}
            autoHideDuration={6000}
            onClose={snackClose}
            message={snack.message}
          />
        </Container>
        </Form>
      </section>
    </>
  );
}
