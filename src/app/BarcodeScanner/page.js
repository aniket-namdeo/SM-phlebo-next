"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import "/public/css/pending-booking.css";
import PageHeader from "../component/page-header";
import Footer from "../component/footer";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BarcodeReader from '@/components/BarcodeReader';

const BarcodeScannerPage = () => {
  const router = useRouter();
  const [scannedBarcode, setScannedBarcode] = useState(null);

  const handleBarcodeScanned = (barcodeData) => {
    setScannedBarcode(barcodeData);
    // Additional logic if needed
    // router.push({
    //   pathname: '/update-booking/package-attachment-details',
    //   query: { scannedBarcode },
    // });
    //router.push('/update-booking/package-attachment-details/');
  };

  return (
    <div>
      <h2>Barcode Scanner</h2>
      <BarcodeReader onBarcodeScanned={handleBarcodeScanned} />
      {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
    </div>
  );
};

export default BarcodeScannerPage;