
import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';

function App() {
  //references setup

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  return (
    <div className="App">
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          color: 'white',
          padding: '1rem 2rem',
          borderRadius: '12px',
          textAlign: 'center',
          zIndex: 99,
          fontSize: '1.2rem',
          maxWidth: '80%',
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 'bold' }}>
          👁️ Real-Time FaceMesh Detection
        </h2>
        <p style={{ marginTop: '0.5rem' }}>
          Built using TensorFlow.js and FaceMesh to detect facial landmarks in real-time using webcam.
        </p>
      </div>

      <Webcam ref={webcamRef}
        style={
          {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            width: '70vw',
            height: '600px',
            marginTop: '2.5rem',
          }
        } />

      <canvas ref={canvasRef}
        style={
          {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9,
            width: '70vw',
            height: '600px'
          }
        }
      />

    </div>
  );
}

export default App;
