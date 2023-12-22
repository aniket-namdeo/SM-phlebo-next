import React, { useEffect } from 'react';
import Quagga from 'quagga';


const BarcodeReader = ({ onBarcodeScanned }) => {
  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#barcode-scanner'),
        },
        decoder: {
          readers: ['ean_reader', 'code_128_reader'],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();

        Quagga.onDetected((result) => {
          onBarcodeScanned(result.codeResult.code);
          Quagga.stop();
        });
      }
    );

    return () => {
      Quagga.stop();
    };
  }, [onBarcodeScanned]);

  return <div id="barcode-scanner" />;
};

export default BarcodeReader;