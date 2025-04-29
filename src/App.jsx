import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import {
  saveSnapshot,
  getSnapshots,
  deleteSnapshot,
} from './utils/localstorageSave';
import { loadDetectionModel, detectAndDraw } from './utils/objectDetection';
import './App.css';
import '@tensorflow/tfjs';
import { FaCamera, FaTrash, FaDownload } from 'react-icons/fa6';
import DetectionList from './components/DetectionList';

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [savedSnapshots, setSavedSnapshots] = useState([]);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const initModel = async () => {
      setIsLoading(true);
      try {
        const loadedModel = await loadDetectionModel();
        setModel(loadedModel);
      } catch (err) {
        console.error('Error loading model:', err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };
    initModel();
  }, []);

  useEffect(() => {
    let interval;
    if (model && webcamRef.current && canvasRef.current) {
      interval = setInterval(async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video &&
          webcamRef.current.video.readyState === 4
        ) {
          const preds = await detectAndDraw(
            model,
            webcamRef.current.video,
            canvasRef.current
          );
          setPredictions(preds);
        }
      }, 200);
    }
    return () => clearInterval(interval);
  }, [model]);

  useEffect(() => {
    setSavedSnapshots(getSnapshots());
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      const updatedSnapshots = saveSnapshot(imageSrc, predictions);
      setSavedSnapshots(updatedSnapshots);
    }
  };

  const handleDelete = (id) => {
    const updatedSnapshots = deleteSnapshot(id);
    setSavedSnapshots(updatedSnapshots);
  };

  const handleDownload = (image, date) => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `capture-${date.replace(/[/: ]/g, '-')}.jpg`;
    link.click();
  };

  if (isLoading) {
    return <div className="loading-message">Chargement du modèle...</div>;
  }

  return (
    <div className="App">
      {!hasError ? (
        <>
          <h1 className="main-title">TensorVision: Détection d'Objets</h1>
          <div className="app-container">
            <div className="top-row-container">
              <div className="video-container">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                  onUserMediaError={() => setHasError(true)}
                  className="webcam-video"
                />
                <canvas ref={canvasRef} className="detection-canvas" />
                <button className="capture-button" onClick={capture}>
                  📸 Capturer
                </button>
              </div>

              <DetectionList detections={predictions} />
            </div>

            <div className="saved-snapshots">
              <h3 className="gallery-title">
                <img
                  src="/tensorvision-logo.svg"
                  alt="Logo"
                  className="gallery-title-logo"
                />
                Captures sauvegardées ({savedSnapshots.length})
              </h3>
              {savedSnapshots.length === 0 ? (
                <p className="empty-gallery">Aucune capture.</p>
              ) : (
                <div className="snapshots-grid">
                  {savedSnapshots.map((snap) => (
                    <div key={snap.id} className="snapshot-item">
                      <img src={snap.image} alt={`Capture du ${snap.date}`} />
                      <div className="snapshot-info">
                        <p>{snap.date}</p>
                        <p>
                          {snap.detections
                            ? `${snap.detections.length} objets`
                            : '0 objet'}
                        </p>
                      </div>
                      <div className="snapshot-actions">
                        <button
                          onClick={() => handleDownload(snap.image, snap.date)}
                          title="Télécharger"
                        >
                          <FaDownload />
                        </button>
                        <button
                          onClick={() => handleDelete(snap.id)}
                          title="Supprimer"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="error-message">
          <p>⚠️ Accès à la caméra refusé ou erreur de chargement du modèle.</p>
          <p>
            Veuillez autoriser l'accès dans votre navigateur et vérifier la
            console.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
