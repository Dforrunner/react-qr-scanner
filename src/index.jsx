import React, { useEffect } from 'react';
import { getDeviceId } from './getDeviceId';
import jsQR from 'jsqr';

const decoder = (imageData) =>
  new Promise((resolve) => {
    const decoded = jsQR(imageData.data, imageData.width, imageData.height);

    if (decoded) resolve(decoded.data);
    else resolve();
  });

export const QrScanner = ({
  onError = (error) => console.log({ error }),
  onScan = (value) => console.log({ value }),
  facingMode = 'environment',
  constraints = null,
  onLoad = () => null,
  flipHorizontally = false,
  style,
  className,
  showViewFinder = true,
  delay = 800,
  resolution = 1080,
  aspectRatio = '16:9',
  viewFinder = {
    border: '12px solid rgba(255,255,255,0.3)',
    position: 'absolute',
    borderRadius: '5px',
    width: '250px',
    height: '250px',
  },
}) => {
  const els = {};
  let timeout, stopCamera;

  const initiate = () => {
    // Check browser facingMode constraint support
    // Firefox ignores facingMode or deviceId constraints
    const isFirefox = /firefox/i.test(navigator.userAgent);

    let supported = {};
    if (
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getSupportedConstraints === 'function'
    )
      supported = navigator.mediaDevices.getSupportedConstraints();

    const constraintsDef = {};

    if (supported.facingMode) {
      constraintsDef.facingMode = { ideal: facingMode };
    }

    if (supported.frameRate) {
      constraintsDef.frameRate = { ideal: 25, min: 10 };
    }

    const vConstraintsPromise =
      supported.facingMode || isFirefox
        ? Promise.resolve(constraints || constraintsDef)
        : getDeviceId(facingMode).then((deviceId) => Object.assign({}, { deviceId }, constraints));

    vConstraintsPromise
      .then((video) => navigator.mediaDevices.getUserMedia({ video }))
      .then(handleVideo)
      .catch(onError);
  };

  const handleVideo = (stream) => {
    const { preview } = els;

    // Preview element hasn't been rendered so wait for it.
    if (!preview) return setTimeout(() => handleVideo(stream), 200);

    // Handle different browser implementations of MediaStreams as src
    if ((preview || {}).srcObject !== undefined) {
      preview.srcObject = stream;
    } else if (preview.mozSrcObject !== undefined) {
      preview.mozSrcObject = stream;
    } else if (window.URL.createObjectURL) {
      preview.src = window.URL.createObjectURL(stream);
    } else if (window.webkitURL) {
      preview.src = window.webkitURL.createObjectURL(stream);
    } else {
      preview.src = stream;
    }

    // IOS (play) in fullscreen
    preview.playsInline = true;

    const streamTrack = stream.getTracks()[0];
    // Assign `stopCamera` so the track can be stopped once component is cleared
    stopCamera = streamTrack.stop.bind(streamTrack);

    preview.addEventListener('loadstart', () => handleLoadStart(preview, streamTrack.label));
  };

  const handleLoadStart = (preview, streamLabel) => {
    preview
      .play()
      .then(() => {
        onLoad({
          mirrorVideo: facingMode === 'environment',
          streamLabel,
        });
        timeout = setTimeout(check, delay);
      })
      .catch(() => {});

    // Some browsers call loadstart continuously
    preview.removeEventListener('loadstart', handleLoadStart);
  };

  const check = () => {
    const { preview, canvas } = els;

    if (!preview) return setTimeout(check, delay);
    // Get image/video dimensions
    let width = Math.floor(preview.videoWidth);
    let height = Math.floor(preview.videoHeight);

    // Canvas draw offsets
    let hozOffset = 0;
    let vertOffset = 0;

    // Crop image to fit 1:1 aspect ratio
    const smallestSize = width < height ? width : height;
    const ratio = resolution / smallestSize;

    height = ratio * height;
    width = ratio * width;

    vertOffset = ((height - resolution) / 2) * -1;
    hozOffset = ((width - resolution) / 2) * -1;

    canvas.width = resolution;
    canvas.height = resolution;

    const previewIsPlaying = preview && preview.readyState === preview.HAVE_ENOUGH_DATA;

    if (previewIsPlaying) {
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      const decode = () => {
        ctx.drawImage(preview, hozOffset, vertOffset, width, height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        decoder(imageData).then((code) => {
          timeout = setTimeout(decode, delay);
          if (code) onScan(code);
        });
      };

      decode();
    } else {
      // Preview not ready -> check later
      timeout = setTimeout(check, delay);
    }
  };

  const setRefFactory = (key) => (element) => (els[key] = element);

  useEffect(() => {
    initiate();

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (stopCamera) {
        stopCamera();
      }
    };
  });

  const hiddenStyle = {
    display: 'none',
  };

  const absoluteCenter = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto',
  };

  const videoPreviewStyle = {
    ...absoluteCenter,
    width: '100%',
    height: '100%',
    display: 'block',
    position: 'absolute',
    overflow: 'hidden',
    objectFit: 'cover',
    transform: flipHorizontally ? 'scaleX(1)' : 'scaleX(-1)',
  };

  const viewFinderStyle = {
    ...absoluteCenter,
    ...viewFinder,
    zIndex: 10,
    position: 'absolute',
  };

  const [x, y] = aspectRatio.split(':');
  const ratio = (y / x) * 100;

  const containerStyle = {
    width: '100%',
    paddingBottom: `${ratio}%`,
    display: 'block',
    overflow: 'hidden',
    position: 'relative',
    objectFit: 'cover',
  };

  return (
    <div className={className} style={style}>
      <div style={containerStyle}>
        {showViewFinder ? <div style={viewFinderStyle} /> : null}

        <video style={videoPreviewStyle} ref={setRefFactory('preview')} />
        <canvas style={hiddenStyle} ref={setRefFactory('canvas')} />
      </div>
    </div>
  );
};
