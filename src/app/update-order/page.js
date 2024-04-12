"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "/public/css/update-booking.css";
import PageHeader from "../component/page-header";
import PageHeaderWithBack from "../component/page-header-with-back";
import { HiOutlineMinusSm } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import Table from "react-bootstrap/Table";
import { Modal } from "react-bootstrap";
import { MdQrCodeScanner } from "react-icons/md";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LabPackageBookingDetails } from "@/api_calls/LabPackageBookingDetails";
import { UpdateBookingMemberDetails } from "@/api_calls/UpdateBookingMemberDetails";
import { LabPackages } from "@/api_calls/LabPackages";
import { ThyrocareSlot } from "@/api_calls/ThyrocareSlot";
import { LabBookingTubeList } from "@/api_calls/LabBookingTubeList";
import { useSearchParams } from "next/navigation";
import Snackbar from "@mui/material/Snackbar";
import BookingList from "@/components/BookingList";
import Swal from "sweetalert2";
import BarcodeScannerPopup from "@/components/BarcodeScannerPopup";
import SignaturePadPopup from "@/components/SignaturePadPopup";

export default function updatebooking() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [userPackageBooking, setUserPackageBooking] = useState({});
  const [userPackageBookingDetails, setUserPackageBookingDetails] = useState([]);

  //Booking Step 2 all state page
  const [selectedSlot, setSelectedSlot] = useState("");
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
    "13:30 - 14:00",
    "14:00 - 14:30",
    "14:30 - 15:00",
    "15:00 - 15:30",
    "15:30 - 16:00",
    "16:00 - 16:30",
    "16:30 - 17:00",
    "17:00 - 17:30",
    "17:30 - 18:00",
    "18:00 - 18:30",
    "18:30 - 19:00",
    "19:00 - 19:30",
    "19:30 - 20:00",
    "20:00 - 20:30",
    "20:30 - 21:00",
    "21:00 - 21:30",
    "21:30 - 22:00",
    "22:00 - 22:30",
    "22:30 - 23:00",
    "23:00 - 23:30",
    "23:30 - 00:00",
  ]);
  const [labTubeList, setLabTubeList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  //Booking Step 3 all state page
  const [scannedBarcode, setScannedBarcode] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openScannerPopup = () => {
    setIsPopupOpen(true);
  };
  const closeScannerPopup = () => {
    setIsPopupOpen(false);
  };
  const [signatureData, setSignatureData] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [snack, setSnack] = useState({
    open: false,
    message: "",
  });
  const snackClose = () => {
    setSnack({
      open: false,
      message: "",
    });
  };

  const validateAndShowError = (field, fieldName) => {
    if (field === undefined || (typeof field === "string" && !field.trim())) {
      Swal.fire({
        title: "Error",
        text: `${fieldName} is required.`,
        icon: "error",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userPackageBooking);

    const { name, email, contact, age, pincode, user_address, slot_time } =
      userPackageBooking;

    if (
      validateAndShowError(name, "Name") &&
      validateAndShowError(email, "Email") &&
      validateAndShowError(contact, "Contact") &&
      validateAndShowError(age, "Age") &&
      validateAndShowError(pincode, "Pincode") &&
      validateAndShowError(user_address, "User address") &&
      validateAndShowError(slot_time, "Slot time")
    ) {
      const otpAPI = await UpdateBookingMemberDetails(
        userPackageBooking.id,
        userPackageBooking
      );

      if (otpAPI.status === 200) {
        console.log(otpAPI.status);

        switch (userPackageBooking.booking_status) {
          case "onHold":
            router.push("/hold-booking");
            break;
          case "canceled":
            router.push("/cancelled-booking");
            break;
          case "pending":
            router.push("/pending-booking");
            break;
          default:
            router.push("/confirmed-booking");
            break;
        }

        setSnack({
          open: true,
          message: "Successfully Update Order Details.",
        });
      } else {
        setSnack({
          open: true,
          message: "Something Wrong.",
        });
      }
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get the latitude and longitude from the position object
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported in this browser.");
    }

    const id = searchParams.get("id");
    async function fetchData() {
      try {
        const res = await LabPackageBookingDetails(id);
        setUserPackageBooking(res);
        setUserPackageBookingDetails(res.lab_package_details);
        const lab_res = await LabPackages();
        setLabPackages(lab_res);
        console.log("userPackageBooking:", res);
        const dynamicParams = {
          pincode: "700051",
          newdate: getCurrentDatePlusOneDay(),
          //newdate: '2023-12-31',
        };
        try {
          const data = await ThyrocareSlot(dynamicParams);
          //setSlots(data.data);
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
        console.error("Error fetching bank types:", error.message);
      }
    }
    setUserPackageBooking((prev) => {
      return { ...prev, slot_time: userPackageBooking.slot_time };
    });
    setSelectedSlot(userPackageBooking.slot_time);
    fetchData();
  }, []);

  //Booking Step 2 page all function
  const handleDateChange = async (event) => {
    const newDate = event.target.value;

    // Update the selectedDate state when the date field changes
    setSelectedDate(newDate);

    try {
      const dynamicParams = {
        pincode: "700051",
        newdate: newDate,
      };

      const data = await ThyrocareSlot(dynamicParams);

      setUserPackageBooking((prev) => {
        return { ...prev, booking_date: newDate };
      });

      //setSlots(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleSlotChange = (event) => {
    const newSelectedSlot = event.target.value;
    setSelectedSlot(newSelectedSlot);
    setUserPackageBooking((prev) => {
      return { ...prev, slot_time: event.target.value };
    });
  };
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getCurrentDatePlusOneDay = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1); // Add one day

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const priceDifference =
    userPackageBooking.package_mrp - userPackageBooking.package_price;
  const camelToTitleCase = (str) => {
    if (!str) {
      return "";
    }
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const removePackage = () => {
    setUserPackageBooking((prev) => {
      return { ...prev, slot_time: "" };
    });
    setSelectedSlot("");
  };
  // const removePackageDetail = (event, labPackageBookingDetailsIdToRemove) => {
  //   event.preventDefault(); // Prevents the default action
  //   console.log(labPackageBookingDetailsIdToRemove);
  //   setUserPackageBooking(prevState => {
  //     // Create a new copy of userPackageBooking object
  //     const updatedUserPackageBooking = {...prevState};
      
  //     // Filter out the lab_package_details array, removing the item with the provided labPackageBookingDetailsIdToRemove
  //     updatedUserPackageBooking.lab_package_details = updatedUserPackageBooking.userPackageBookingDetails.filter(
  //       detail => detail.lab_package_booking_details_id !== labPackageBookingDetailsIdToRemove
  //     );
  
  //     return updatedUserPackageBooking;
  //   });
  // };
  
  
  const packageChange = (val) => {
    const lab_package_obj = labPackages.filter((i) => i.lab_package_id == val);
    console.log(lab_package_obj[0].lab_package_name);
    setUserPackageBooking((prev) => {
      return { ...prev, package_name: lab_package_obj[0].lab_package_name };
    });
    setUserPackageBooking((prev) => {
      return { ...prev, package_price: lab_package_obj[0].package_price };
    });

    setUserPackageBooking((prev) => {
      return { ...prev, package_mrp: lab_package_obj[0].package_mrp };
    });

    setUserPackageBooking((prev) => {
      return { ...prev, package_id: lab_package_obj[0].lab_package_id };
    });
  };
  const handleGetDirections = () => {
    const googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${userPackageBooking.latitude},${userPackageBooking.longitude}`;
    window.open(googleMapsLink, "_blank");
  };

  // Step 3 Function
  const handleBarcodeScanned = (barcode) => {
    console.log("Barcode scanned:", barcode);
    setScannedBarcode(barcode);
    setUserPackageBooking((prev) => {
      return { ...prev, master_barcode_no: barcode };
    });
  };
  const [isSignaturePopupOpen, setIsSignaturePopupOpen] = useState(false);
  const openSignaturePopup = () => {
    setIsSignaturePopupOpen(true);
  };
  const closeSignaturePopup = () => {
    setIsSignaturePopupOpen(false);
  };
  const handleSignatureChange = (data) => {
    setSignatureData(data);
    setUserPackageBooking((prev) => {
      return { ...prev, customer_signature: data };
    });
  };
  const handleSaveSignature = () => {
    console.log("Signature saved:", signatureData);
    closeSignaturePopup();
  };
  const handleRemoveSignature = () => {
    setSignatureData(null);
  };
  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setUserPackageBooking((prev) => {
      return { ...prev, booking_status: value };
    });
  };
  const handleTextAreaChange = (value) => {
    // Handle the change in the text area value if needed
    setUserPackageBooking((prev) => {
      return { ...prev, reamark: value };
    });
  };

  return (
    <>
      <PageHeaderWithBack heading="Update Booking" />
      <section className="update-booking section-padding">
        <Container>
          <Row>
            <Col>
              <p className="mb-3 text-danger">Patient Details</p>
              <Form onSubmit={handleSubmit}>
                <div className="web-box">
                  <h2 className="box-heading">Customer Details</h2>
                  <div className="box-body">
                    <Form.Group className="mb-3">
                      <Form.Label>Relation*</Form.Label>
                      <Form.Select
                        className="page-form-control"
                        value={userPackageBooking.booking_for}
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            booking_for: e.target.value,
                          })
                        }
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
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            name: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Age*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Age"
                        className="page-form-control"
                        value={userPackageBooking.age}
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            age: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender*</Form.Label>
                      <Form.Select
                        className="page-form-control"
                        value={userPackageBooking.gender}
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            gender: e.target.value,
                          })
                        }
                      >
                        <option>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        className="page-form-control"
                        value={userPackageBooking.email}
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            email: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Contact*</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Age"
                        className="page-form-control"
                        value={userPackageBooking.contact}
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            contact: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Landmark/Sublocality*</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Landmark"
                        style={{ height: "80px" }}
                        className="page-form-control"
                        value={userPackageBooking.user_address}
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            user_address: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Pincode"
                        className="page-form-control"
                        value={userPackageBooking.pincode}
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            pincode: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <div className="mb-3 text-center">
                      <Link href="#" onClick={handleGetDirections}>
                        Get direction to customer
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="web-box">
                  <h2 className="box-heading">Package Details</h2>
                  <div className="box-body">
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
                        <br /> {userPackageBooking.contact}
                      </p>
                    </div>
                    <div>
                      {userPackageBooking.slot_time === "" ? (
                        <div>
                          <div>
                            <Form.Group className="mb-3">
                              <Form.Label>Choose Package*</Form.Label>
                              <Form.Select
                                className="page-form-control"
                                value={userPackageBooking.package_id}
                                onChange={(e) => packageChange(e.target.value)}
                              >
                                <option key="0" value="">
                                  Select Package
                                </option>
                                {labPackages.map((labPackage) => (
                                  <option
                                    key={labPackage.lab_package_id}
                                    value={labPackage.lab_package_id}
                                  >
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
                                value={userPackageBooking.booking_date}
                                min={getCurrentDate()}
                                onChange={handleDateChange}
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <p className="mb-0">Booking Slot</p>
                              <Form.Select
                                name="Slot"
                                value={userPackageBooking.slot_time}
                                onChange={handleSlotChange}
                              >
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
                        <>
                          {userPackageBookingDetails.map((packageDetail, index) => (
                            <div key={index} className="selected-packages mb-3">
                              <p className="text-secondary mb-2">
                                <small>{packageDetail.package_name}</small>
                              </p>
                              <p className="mb-0">Rs. {packageDetail.package_price}</p>             
                              {/* <button
                                onClick={removePackage}
                                className="delete-btn btn btn-danger"
                              >
                                <HiOutlineMinusSm />
                              </button>               */}
                              {/* <button
                                onClick={(e) => removePackageDetail(e, packageDetail.lab_package_booking_details_id)} // Replace 87 with the appropriate lab_package_booking_details_id
                                className="delete-btn btn btn-danger"
                              >
                                <HiOutlineMinusSm />
                              </button> */}
                            </div>
                          ))}
                        </>
                      )}
                      <div className="text-center">
                        {labTubeList.map((tube) => (
                          <Link
                            href={`update-order/package-attachment-details?id=${tube.tube_id}&booking_id=${userPackageBooking.id}`}
                            className="text-danger"
                          >
                            <p>{tube.tube_type}</p>
                            <hr />
                          </Link>
                        ))}
                        <Link
                          href={`update-order/package-attachment-details?booking_id=${userPackageBooking.id}`}
                          className="text-danger"
                        >
                          <p>Add Tube </p>
                          <hr />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="web-box">
                  <div>
                    <h2 className="box-heading">Customer Signature</h2>
                    {signatureData ? (
                      <div className="box-body text-center">
                        <p className="m-0">Signature Saved</p>
                        {/* <img src={signatureData} alt="Customer Signature" /> */}
                      </div>
                    ) : (
                      <div className="box-body">
                        <a
                          className="sign text-center d-block"
                          onClick={openSignaturePopup}
                        >
                          Take Customer signature
                        </a>
                      </div>
                    )}

                    {isSignaturePopupOpen && (
                      <SignaturePadPopup
                        onSignatureChange={handleSignatureChange}
                        onSaveSignature={handleSaveSignature}
                        onClose={closeSignaturePopup}
                      />
                    )}
                  </div>
                </div>
                <div className="web-box">
                  <h2 className="box-heading">Master Barcode Value</h2>
                  <div className="box-body">
                    <div className="d-flex align-items-center justify-content-between gap-3">
                      <Form.Control
                        type="text"
                        placeholder=""
                        // value={userPackageBooking.master_barcode_no ? userPackageBooking.master_barcode_no : scannedBarcode}
                        value={
                          userPackageBooking.master_barcode_no !== undefined
                            ? userPackageBooking.master_barcode_no
                            : scannedBarcode
                        }
                        onChange={(e) => {
                          // Handle the input change and update the state accordingly
                          setUserPackageBooking({
                            ...userPackageBooking,
                            master_barcode_no: e.target.value,
                          });
                        }}
                        className="page-form-control"
                      />
                      <Link
                        onClick={openScannerPopup}
                        href={"#"}
                        className="scan text-center"
                      >
                        <MdQrCodeScanner />
                        <br />
                        Scan
                      </Link>
                      {isPopupOpen && (
                        <div className="popup-container">
                          <div className="popup-content">
                            <BarcodeScannerPopup
                              onBarcodeScanned={handleBarcodeScanned}
                              onClose={closeScannerPopup}
                            />
                          </div>
                        </div>
                      )}

                      <style jsx>{`
                        .popup-container {
                          position: fixed;
                          top: 0;
                          left: 0;
                          width: 100%;
                          height: 100%;
                          background: rgba(0, 0, 0, 0.5);
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        }

                        .popup-content {
                          background: #fff;
                          padding: 20px;
                          border-radius: 8px;
                        }
                      `}</style>
                    </div>
                  </div>
                </div>
                <div className="web-box">
                  <h2 className="box-heading">Pickup Status*</h2>
                  <div className="box-body">
                    <Form.Select
                      className="page-form-control"
                      onChange={(e) => handleSelectChange(e.target.value)}
                    >
                      <option>Select</option>
                      <option value="confirmed">Picked</option>
                      <option value="canceled">Not Picked</option>
                      <option value="pending">Pending</option>
                      <option value="onHold">Hold</option>
                    </Form.Select>
                  </div>
                  {selectedOption === "canceled" ||
                  selectedOption === "onHold" ? (
                    <div className="box-body">
                      <Form.Select
                        className="page-form-control"
                        value={userPackageBooking.reason}
                        onChange={(e) =>
                          setUserPackageBooking({
                            ...userPackageBooking,
                            reason: e.target.value,
                          })
                        }
                      >
                        <option value="outOfStation">
                          Customer out of station
                        </option>
                        <option value="notReal">
                          Booking not confirmed, customer not real
                        </option>
                        <option value="notFasting">
                          Customer not in fasting
                        </option>
                        <option value="phleboLate">Phlebotomist late</option>
                        <option value="holdDueToPayment">
                          Hold due to payment
                        </option>
                        <option value="cancelRequest">
                          Customer wants to cancel
                        </option>
                        <option value="addressNotFound">
                          Address not found
                        </option>
                        <option value="rescheduleRequest">
                          Customer wants to reschedule
                        </option>
                        <option value="notResponding">
                          Customer not responding to call
                        </option>
                        <option value="outOfCity">Out of city</option>
                      </Form.Select>
                      <Form.Group controlId="additionalInfo">
                        <Form.Label>Additional Information:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="4"
                          placeholder="Provide additional information..."
                          onChange={(e) => handleTextAreaChange(e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  ) : null}
                </div>
                {selectedOption === "confirmed" &&
                userPackageBooking.payment_status !== "completed" ? (
                  <div className="web-box">
                    <h2 className="box-heading">Payment Details</h2>
                    <div className="web-box">
                      <h2 className="box-heading">Order Summary</h2>
                      <div className="box-body">
                        <Table striped bordered hover>
                          <tbody>
                            <tr>
                              <td>Price</td>
                              <th>{userPackageBooking.cash_payment}</th>
                            </tr>
                            <tr>
                              <td>Discount</td>
                              <th>
                                {/* {priceDifference} */} 0
                              </th>
                            </tr>
                            <tr>
                              <td>Price After Discount</td>
                              <th>{userPackageBooking.cash_payment}</th>
                            </tr>
                            <tr>
                              <td>Payment Status</td>
                              <th>
                                {camelToTitleCase(
                                  userPackageBooking.payment_status
                                )}
                              </th>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="box-body">
                      <Form.Select
                        className="page-form-control"
                        value={userPackageBooking.payment_mode}
                        onChange={(e) =>
                          setUserPackageBooking((prevUserPackageBooking) => ({
                            ...prevUserPackageBooking,
                            payment_mode: e.target.value,
                          }))
                        }
                      >
                        <option>select</option>
                        <option value="cash">Cash</option>
                        <option value="link">Payment QR</option>
                      </Form.Select>
                      <Form.Group className="mb-3">
                        <Form.Label>Receivable Amount*</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          value={userPackageBooking.cash_payment}
                          onChange={(e) =>
                            setUserPackageBooking({
                              ...userPackageBooking,
                              cash_payment: e.target.value,
                            })
                          }
                          className="page-form-control"
                          readOnly
                        />
                      </Form.Group>
                      {userPackageBooking.payment_mode === "link" && (
                        <div className="text-center mb-3">
                          <Link href="#" onClick={handleShow}>
                            Payment QR Code
                          </Link>
                        </div>
                      )}
                      <Form.Group controlId="additionalInfo">
                        <Form.Label>Additional Information:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows="4"
                          placeholder="Provide additional information..."
                          onChange={(e) => handleTextAreaChange(e.target.value)}
                        />
                      </Form.Group>
                      <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Payment Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* Add your content for the payment information here */}
                          <img
                            src="https://www.lyra.com/in/wp-content/uploads/sites/8/2020/05/OQ-Code-Payments.png"
                            alt="Payment Info"
                          />
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </div>
                ) : (
                  selectedOption === "confirmed" &&
                  userPackageBooking.payment_status === "completed" && (
                    <>
                      <div className="web-box">
                        <h2 className="box-heading">Order Summary</h2>
                        <div className="box-body">
                          <Table striped bordered hover>
                            <tbody>
                              <tr>
                                <td>Price</td>
                                <th>{userPackageBooking.cash_payment}</th>
                              </tr>
                              <tr>
                                <td>Discount</td>
                                <th>
                                  {/* {priceDifference} */} 0
                                </th>
                              </tr>
                              <tr>
                                <td>Price After Discount</td>
                                <th>{userPackageBooking.cash_payment}</th>
                              </tr>
                              <tr>
                                <td>Payment Status</td>
                                <th>
                                  {camelToTitleCase(
                                    userPackageBooking.payment_status
                                  )}
                                </th>
                              </tr>
                            </tbody>
                          </Table>
                          {/* <Link href={"#"} className="btn web-stroke-btn w-100">
                          <FaPlus />
                          Select Coupon
                        </Link> */}
                        </div>
                      </div>
                    </>
                  )
                )}
                <Link
                  href={"#"}
                  className="btn web-stroke-btn mb-3 d-block"
                  onClick={handleSubmit}
                >
                  Update Order Details
                </Link>

                {/* <Link href={ `update-booking/step2?id=${userPackageBooking.id}`} className="btn web-btn d-block">
                  Next
                </Link> */}
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
