"use client";

import React, { useRef, useEffect } from "react";
import "./CameraScreen.css";

function CameraScreen({
  saveLatestPhoto,
}: {
  saveLatestPhoto: (photo: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    }
    enableCamera();

    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const size = Math.min(
          videoRef.current.videoWidth,
          videoRef.current.videoHeight
        );
        canvasRef.current.width = size;
        canvasRef.current.height = size;

        context.drawImage(videoRef.current, 0, 0, size, size, 0, 0, size, size);
        const imageData = canvasRef.current.toDataURL("image/png");
        saveLatestPhoto(imageData);
      }
    }
  };

  return (
    <div data-testid="camera-screen" className="camera-screen">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="camera-view"
        style={{ aspectRatio: "1 / 1" }}
      ></video>
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      <button
        className="shutter-button"
        onClick={takePhoto}
        aria-label="shutter"
        data-testid="shutter-button"
      ></button>
    </div>
  );
}

export default CameraScreen;
