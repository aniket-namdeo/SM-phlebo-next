import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

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
    <div>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ className: 'signature-canvas' }}
        onEnd={handleEnd}
      />
      <div className='clear_canvas'>
        <a onClick={handleClear}>Clear Signature</a>
      </div>
    </div>
  );
};

export default SignaturePad;