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

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LabPackageBookingDetails } from '@/api_calls/LabPackageBookingDetails';
import { UpdateBookingMemberDetails } from '@/api_calls/UpdateBookingMemberDetails';
import { LabPackages } from '@/api_calls/LabPackages';
import { ThyrocareSlot } from '@/api_calls/ThyrocareSlot';
import { LabBookingTubeList } from '@/api_calls/LabBookingTubeList';
import { useSearchParams } from 'next/navigation';
import Snackbar from '@mui/material/Snackbar';
import BookingList from '@/components/BookingList';
import Swal from 'sweetalert2';

export default function step2() {

  const searchParams = useSearchParams();  
  const [selectedSlot, setSelectedSlot] = useState("");
  const [userPackageBooking, setUserPackageBooking] = useState({});
  const [labPackages, setLabPackages] = useState([]);
  const [slots, setSlots] = useState({});
  const [labTubeList, setLabTubeList] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');     
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
    console.log(userPackageBooking);
    const { slot_time , package_name} = userPackageBooking;
    if (!slot_time.trim()  ) {
      Swal.fire({
        title: 'Error',
        text: 'You Must Select The slot.',
        icon: 'error',
      });
    }else if(!package_name.trim()){

      Swal.fire({
        title: 'Error',
        text: 'You Must Select The package.',
        icon: 'error',
      });

    } else {
      const otpAPI = await UpdateBookingMemberDetails(userPackageBooking.id,userPackageBooking); 
      if(otpAPI.status == 200){
        console.log(otpAPI.status);      
        setSnack({
            open: true,
            message: 'Successfully Update Member Details.'
        });
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
    async function fetchData() {
      try {
        const res = await LabPackageBookingDetails(id);
        setUserPackageBooking(res);
        const lab_res = await LabPackages();
        setLabPackages(lab_res);
        console.log('userPackageBooking:', res);
          const dynamicParams = {
            pincode: '700051',
            newdate: getCurrentDatePlusOneDay(),
            //newdate: '2023-12-31',
          };    
          try {
            const data = await ThyrocareSlot(dynamicParams);
              setSlots(data.data);
          } catch (error) {
            console.error(error.message);
          }
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await LabBookingTubeList(id);
        console.log(response);
        setLabTubeList(response); // Assuming response.data is the array of tube types
      } catch (error) {
        console.error('Error fetching bank types:', error.message);
      }

      
    }
    setUserPackageBooking((prev) => {
      return { ...prev, slot_time: userPackageBooking.slot_time};
    });
    setSelectedSlot(userPackageBooking.slot_time);
    fetchData();
  }, []);
  const handleDateChange = async (event) => {
    const newDate = event.target.value;
  
    // Update the selectedDate state when the date field changes
    setSelectedDate(newDate);
  
    try {
      const dynamicParams = {
        pincode: '700051',
        newdate: newDate,
      };
  
      const data = await ThyrocareSlot(dynamicParams);
      
      setUserPackageBooking((prev) => {
        return { ...prev, booking_date: newDate };
      });
  
      setSlots(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleSlotChange = (event) => {
    const newSelectedSlot = event.target.value;
    setSelectedSlot(newSelectedSlot);
    setUserPackageBooking((prev) => {
      return { ...prev, slot_time: event.target.value};
    });
  };
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentDatePlusOneDay = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add one day
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  const priceDifference = userPackageBooking.package_mrp - userPackageBooking.package_price;
  const camelToTitleCase = (str) => {
    if (!str) {
      return '';
    }
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const removePackage = () => {
    // Set userPackageBooking to an object with package_name as an empty string
    setUserPackageBooking(prev => {
      return { ...prev, package_name: ''}
    });
    setUserPackageBooking(prev => {
      return { ...prev, slot_time: ''}
    });
    setSelectedSlot('');
    //setUserPackageBooking({ ...userPackageBooking, slot_time: '' });
  };
  const packageChange = (val) => {
    const lab_package_obj = labPackages.filter(i => i.lab_package_id == val);
    console.log(lab_package_obj[0].lab_package_name);
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

  }
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
                  <Form onSubmit={handleSubmit}>
                    <div className="info-box mb-3">
                      <p>
                        <span>Primary User Name:</span>
                        <br /> {userPackageBooking.name}
                      </p>
                      <p>
                        <span>Primary User Age</span>
                        <br /> {userPackageBooking.age}
                      </p>
                    </div>
                    <div className="info-box mt-3 mb-3">
                      <p>
                        <span>Collection Date</span>
                        <br /> {userPackageBooking.booking_date}
                      </p>
                      <p>
                        <span>Collection Time</span>
                        <br /> {userPackageBooking.slot_time}
                      </p>
                      <p>
                        <span>Mobile Number</span>
                        <br />  {userPackageBooking.contact}
                      </p>                 
                    </div>
                    <div>
                      {userPackageBooking.slot_time == "" ? (
                        <div>
                          <div>
                            <Form.Group className="mb-3">
                              <Form.Label>Choose Package*</Form.Label>
                              <Form.Select
                                className="page-form-control"
                                value={userPackageBooking.package_id} 
                                onChange={(e) => packageChange(e.target.value)}
                              >
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
                                value={getCurrentDatePlusOneDay()}
                                min={getCurrentDate()}
                                onChange={handleDateChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <p className="mb-0">Booking Slot</p>
                              <Form.Select name="Slot" value={selectedSlot} onChange={handleSlotChange}>
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
                      ) : (
                        <div className="selected-packages mb-3">
                          <p className="text-secondary mb-2">
                            <small>{userPackageBooking.package_name}</small>
                          </p>
                          <p className="mb-0">{userPackageBooking.package_price}</p>
                          <button onClick={removePackage} className="delete-btn btn btn-danger">
                            <HiOutlineMinusSm />
                          </button>
                        </div>
                      )}
                      <div className="text-center">
                      {labTubeList.map((tube) => (
                        <Link href={`package-attachment-details?id=${tube.tube_id}&booking_id=${userPackageBooking.id}`} className="text-danger">
                          <p>{tube.tube_type}</p><hr/>
                        </Link>
                      ))}
                       <Link href={`package-attachment-details?booking_id=${userPackageBooking.id}`} className="text-danger">
                          <p>Add Tube </p><hr/>
                        </Link>
                        
                      </div>
                    </div>
                    {/* <div className="text-center">
                      <Link href={"#"} className="text-danger">
                        Tube Details
                      </Link>
                    </div> */}
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
                Update Booking Details
              </Link>

              <Link href={ `step3?id=${userPackageBooking.id}`} className="btn web-btn w-100">
                Next
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
      </section>
    </>
  );
}
