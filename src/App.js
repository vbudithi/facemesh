// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

// Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

import React, { useRef, useEffect } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  const runFacemesh = async () => {
    const net = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net)

    }, 10)
  }


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
      console.log(face);

      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => { drawMesh(face, ctx) });
    }
  };

  useEffect(() => { runFacemesh() }, []);

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
          Built using TensorFlow.js and FaceMesh to detect facial landmarks in real-time using webcam.
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

