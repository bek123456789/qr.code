import React, { useState } from "react";
import WebcamCapture from "./WebcamCapture";
import jsQR from 'jsqr';

const QRScanner = () => {
  const [qrCode, setQrCode] = useState(""); // This will store the QR code data (text/URL)

  const handleScan = (imageSrc) => {
    if (imageSrc) {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" });

        if (code) {
          setQrCode(code.data); // Save the actual data of the QR code (text/URL)
          console.log("QR Code Data: ", code.data); // Log the data of the QR code
        }
      };
    }
  };

  return (
    <div>
      <WebcamCapture onScan={handleScan} />
      {qrCode && <p>QR Code Data: {qrCode}</p>} {/* Display the scanned QR code data */}
    </div>
  );
};

export default QRScanner;
