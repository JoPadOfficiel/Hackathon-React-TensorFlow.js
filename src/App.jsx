import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { saveSnapshot, getSnapshots } from "./utils/localstorageSave";
import "./App.css";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [savedSnapshots, setSavedSnapshots] = useState([]);

  useEffect(() => {
    setSavedSnapshots(getSnapshots());
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setScreenshot(imageSrc);
      
      const updatedSnapshots = saveSnapshot(imageSrc);
      setSavedSnapshots(updatedSnapshots);
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
              <p>📷 Capture récente :</p>
              <img src={screenshot} alt="Capture webcam" />
            </div>
          )}

          {savedSnapshots.length > 0 && (
            <div className="saved-snapshots">
              <h3>Captures sauvegardées ({savedSnapshots.length})</h3>
              <div className="snapshots-grid">
                {savedSnapshots.map((snap) => (
                  <div key={snap.id} className="snapshot-item">
                    <img src={snap.image} alt={`Capture du ${snap.date}`} />
                    <p>{snap.date}</p>
                  </div>
                ))}
              </div>
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