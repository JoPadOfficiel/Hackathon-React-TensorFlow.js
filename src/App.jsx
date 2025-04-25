import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./utils/localstorageSave"
import "./App.css";
import { log } from "@tensorflow/tfjs";

const savesnapchatData = require("./utils/localstorageSave")
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const localstorage = () => {
    savesnapchatData();
    console.log(localstorage);
    
  }
  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setScreenshot(imageSrc);
    }
  };
 
  return (
    <div className="App">
      {!hasError ? (
        <div className="video-container">
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMediaError={() => setHasError(true)}
            className="webcam-video"
          />

          <button className="capture-button" onClick={capture}>
            📸 Capturer
          </button>

          {screenshot && (
            <div className="screenshot-preview">
              <p>📷 Capture :</p>
              <img src={screenshot} alt="Capture webcam" />
            </div>
          )}
        </div>
      ) : (
        <div className="error-message">
          <p>⚠️ Accès à la caméra refusé.</p>
          <p>Veuillez autoriser l'accès dans votre navigateur.</p>
        </div>
      )}
    </div>
  );
}

export default App;