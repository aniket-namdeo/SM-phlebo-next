import React, { useRef } from "react";
import SignaturePad from "@/components/SignaturePad";
import SignatureCanvas from "react-signature-canvas";
import { IoClose } from "react-icons/io5";

const SignaturePadPopup = ({ onSignatureChange, onSaveSignature, onClose }) => {
  const signatureRef = useRef();

  const handleSignatureChangeLocal = (data) => {
    onSignatureChange(data);
  };

  const handleSaveSignatureLocal = () => {
    onSaveSignature();
  };

  const handleClear = () => {
    signatureRef.current.clear();
    onSignatureChange(null);
  };

  return (
    <div className="popup-container-signature web-popup">
      <div className="popup-content-signature">
        <h2 className="heading d-flex align-items-center justify-content-between">
          <span>Signature Pad</span>
          <button className="btn close-btn bg-danger" onClick={onClose}>
            <IoClose />
          </button>
        </h2>
        <SignaturePad
          ref={signatureRef}
          onSignatureChange={handleSignatureChangeLocal}
        />
        <div className="d-flex align-items-center justify-content-end">
          <button className="btn web-btn" onClick={handleSaveSignatureLocal}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePadPopup;
