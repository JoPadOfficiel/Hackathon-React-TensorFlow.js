import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamView = () => {
  const webcamRef = useRef(null);
  const [hasError, setHasError] = useState(false);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      {!hasError ? (
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMediaError={() => setHasError(true)}
          className="webcam-video"
        />
      ) : (
        <div style={{ padding: "2rem", color: "#fff", backgroundColor: "#000", textAlign: "center" }}>
          <p>⚠️ Accès à la caméra refusé.</p>
          <p>Veuillez autoriser l'accès à la webcam dans votre navigateur.</p>
        </div>
      )}
    </div>
  );
};

export default WebcamView;