import React from 'react';
import Webcam from 'react-webcam';

export default class WebcamCapture extends React.Component {
  static currentCapture;
  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
  };

  render() {
    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
        <img src={this.imageSrc}></img>
      </div>
    );
  }
}