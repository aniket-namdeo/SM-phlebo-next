import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignaturePad = ({ onSignatureChange }) => {
  const signatureRef = useRef();

  const handleEnd = () => {
    // Retrieve the signature data and pass it to the parent component
    const signatureData = signatureRef.current.toDataURL();
    onSignatureChange(signatureData);
  };

  const handleClear = () => {
    signatureRef.current.clear();
    onSignatureChange(null);
  };

  return (
    <div className="signature-wrapper">
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ className: "signature-canvas" }}
        onEnd={handleEnd}
      />
      <a onClick={handleClear} className="btn web-stroke-btn clear-btn">
        Clear
      </a>
    </div>
  );
};

export default SignaturePad;
