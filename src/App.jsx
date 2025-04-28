import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { saveSnapshot, getSnapshots } from "./utils/localstorageSave";
import { loadDetectionModel, detectAndDraw } from "./utils/objectDetection";
import "./App.css";
import "@tensorflow/tfjs";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [savedSnapshots, setSavedSnapshots] = useState([]);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const initModel = async () => {
      try {
        const loadedModel = await loadDetectionModel();
        setModel(loadedModel);
      } catch (err) {
        console.error("Error loading model:", err);
        setHasError(true);
      }
    };
    initModel();
  }, []);

  useEffect(() => {
    if (model && webcamRef.current && canvasRef.current) {
      const runDetection = async () => {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        
        if (video.readyState === 4) {
          await detectAndDraw(model, video, canvas);
        }
      };

      const interval = setInterval(() => {
        runDetection();
      }, 200);

      return () => clearInterval(interval);
    }
  }, [model]);

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
          <canvas
            ref={canvasRef}
            className="detection-canvas"
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
          <p>⚠️ Accès à la caméra refusé ou erreur de chargement du modèle.</p>
          <p>Veuillez autoriser l'accès dans votre navigateur et vérifier la console.</p>
        </div>
      )}
    </div>
  );
}

export default App;
