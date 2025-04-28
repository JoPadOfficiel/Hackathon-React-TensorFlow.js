import React from 'react';

const DetectionList = ({ detections }) => {
  return (
    <div className="detection-list-container">
      <h4>Objets détectés ({detections.length})</h4>
      {detections.length === 0 ? (
        <p className="no-detections">Aucun objet détecté pour le moment.</p>
      ) : (
        <ul className="detection-list">
          {detections.map((detection, index) => (
            <li key={`${detection.class}-${index}`} className="detection-item">
              <span className="detection-class">{detection.class}</span>
              <span className="detection-score">{Math.round(detection.score * 100)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DetectionList; 