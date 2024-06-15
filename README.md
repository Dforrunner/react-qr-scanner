# Introduction

A React component that provides a simple and efficient way to read QR codes from a web or mobile camera. This lightweight component utilizes HTML canvas to capture images and leverages the jsQR library to detect QR codes within the image data.
<b>NOTE: HTTPS is required to use camera on mobile devices. However, you can test over localhost on your computer

## [DEMO](https://react-qrcode-scanner-demo.vercel.app/)

# Install

```bash
npm i react-qrcode-scanner
```

# Example

```javascript
import React from 'react';
import { QrScanner } from 'react-qrcode-scanner';

function App() {
  const handleScan = (value) => {
    console.log({ value });
  };

  const handleError = (error) => {
    console.log({ error });
  };

  return (
    <div className='App'>
      <QrScanner onScan={handleScan} onError={handleError} />
    </div>
  );
}

export default App;
```

# Props

| Prop Name        | Type     | Default Value                                                                                                              | Description                                                                                  |
| ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| onError          | Function | (error) => console.log({error})                                                                                            | Callback function that is called when an error occurs during scanning.                       |
| onScan           | Function | (value) => console.log({value})                                                                                            | Callback function that is called when a QR code is successfully scanned.                     |
| facingMode       | String   | 'environment'                                                                                                              | The facing mode of the camera. Can be set to 'environment' or 'face'.                        |
| constraints      | Object   | null                                                                                                                       | The device constraints for the camera.                                                       |
| onLoad           | Function | (val: {mirrorVideo, streamLabel}) => null                                                                                  | Callback function that is called when the component is loaded.                               |
| flipHorizontally | Boolean  | false                                                                                                                      | Determines whether the video output should be flipped or reflected based on the facing mode. |
| style            | Object   | null                                                                                                                       | Additional styling for the section.                                                          |
| className        | String   | null                                                                                                                       | Additional class names for the section wrapper.                                              |
| delay            | Number   | 800                                                                                                                        | The delay between each scan attempt in milliseconds.                                         |
| resolution       | Number   | 600                                                                                                                        | The resolution of the canvas in pixels.                                                      |
| aspectRatio      | string   | '16:9'                                                                                                                     | Aspect ratio of the video frame. Default is landscape. Change to '3:4' for portrait          |
| showViewFinder   | Boolean  | true                                                                                                                       | Determines whether to show the viewfinder.                                                   |
| viewFinder       | Object   | { border: '12px solid rgba(255,255,255,0.3)', position: 'absolute', borderRadius: '5px', width: '250px', height: '250px' } | Additional CSS styles for the viewfinder element.                                            |

# License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
