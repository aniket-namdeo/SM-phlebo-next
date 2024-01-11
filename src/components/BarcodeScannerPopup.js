import React, { useState, useEffect } from 'react';
import BarcodeReader from '@/components/BarcodeReader';
import Link from "next/link";

const BarcodeScannerPopup = ({ onBarcodeScanned, onClose }) => {
  const [scannedBarcode, setScannedBarcode] = useState(null);

  const handleBarcodeScanned = (barcodeData) => {
    setScannedBarcode(barcodeData);
    onBarcodeScanned(barcodeData);
  };

  useEffect(() => {
    // Perform any necessary initialization logic here
    // For example, initializing a barcode reader library

    return () => {
      // Cleanup logic if needed
    };
  }, []);

  useEffect(() => {
    // Close the popup when scannedBarcode changes
    if (scannedBarcode) {
      onClose();
    }
  }, [scannedBarcode, onClose]);

  return (
    <div>
      <h2>Barcode Scanner</h2>
      <BarcodeReader onBarcodeScanned={handleBarcodeScanned} />
      {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
        <Link href={"#"} className="btn web-stroke-btn mb-3 d-block"  onClick={onClose}>
            Close
        </Link>
    </div>
  );
};

export default BarcodeScannerPopup;