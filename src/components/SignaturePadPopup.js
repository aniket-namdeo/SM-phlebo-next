import React, { useRef } from 'react';
import SignaturePad from '@/components/SignaturePad';

const SignaturePadPopup = ({ onSignatureChange, onSaveSignature, onClose }) => {
  const signatureRef = useRef();

  const handleSignatureChangeLocal = (data) => {
    onSignatureChange(data);
  };

  const handleSaveSignatureLocal = () => {
    onSaveSignature();
  };

  return (
    <div className="popup-container-signature">
      <div className="popup-content-signature">
        <h2>Signature Pad</h2>
        <SignaturePad
          ref={signatureRef}
          onSignatureChange={handleSignatureChangeLocal}
        />
        <div className="save-button">
          <button className="btn web-stroke-btn w-100" onClick={handleSaveSignatureLocal}>Save Signature</button>
        </div>
        <div className="close-button">
          <button className="btn web-stroke-btn w-100" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePadPopup;