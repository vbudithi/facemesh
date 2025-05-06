// Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

import React, { useRef, useEffect } from "react";
import "./App.css";

// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runFacemesh = async () => {
      const net = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      setInterval(() => {
        detect(net);
      }, 10);
    };

    runFacemesh();
  }, []);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces({ input: video });

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => { drawMesh(face, ctx) });
    }
  };


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
          fontSize: '1.2rem'
        }}
      >
        <h2 style={{ margin: 0, fontWeight: 'bold' }}>
          👁️ Real-Time FaceMesh Detection
        </h2>
        <p style={{ marginTop: '0.5rem' }}>
          Built with TensorFlow.js and FaceMesh to detect facial landmarks in real-time using the webcam.
        </p>
      </div>

      <div className="App-header" >
        <Webcam ref={webcamRef}
          style={
            {
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '1300',
              height: '600',
              textAlign: "center",
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
              textAlign: "center",
              width: '1300',
              height: '600',
              marginTop: '2.5rem',
            }
          }
        />

      </div>

    </div>
  );
}

export default App;

