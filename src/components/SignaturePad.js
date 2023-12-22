import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ onSignatureChange }) => {
  const signatureRef = useRef();

  const handleEnd = () => {
    // Retrieve the signature data and pass it to the parent component
    const signatureData = signatureRef.current.toDataURL();
    onSignatureChange(signatureData);
  };

  return (
    <SignatureCanvas
      ref={signatureRef}
      canvasProps={{ className: 'signature-canvas' }}
      onEnd={handleEnd}
    />
  );
};

export default SignaturePad;