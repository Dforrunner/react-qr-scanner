function NoVideoInputDevicesError() {
  return new Error({
    name: 'NoVideoInputDevicesError',
    message: 'No video input devices found',
  });
}

function defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode) {
  if (filteredDevices.length > 0) return filteredDevices[0].deviceId;

  if (videoDevices.length === 1 || facingMode === 'user') return videoDevices[0].deviceId;

  return videoDevices[1].deviceId;
}

function getFacingModePattern(facingMode) {
  return facingMode === 'environment' ? /rear|back|environment/gi : /front|user|face/gi;
}

// Get manual deviceId from available devices.
export function getDeviceId(facingMode, chooseDeviceId = defaultDeviceIdChooser) {
  return new Promise((resolve, reject) => {
    let enumerateDevices;
    try {
      enumerateDevices = navigator.mediaDevices.enumerateDevices();
    } catch (err) {
      reject(new NoVideoInputDevicesError());
    }
    enumerateDevices.then((devices) => {
      // Filter out non-video inputs
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      if (videoDevices.length < 1) {
        reject(new NoVideoInputDevicesError());
        return;
      }

      const pattern = getFacingModePattern(facingMode);

      // Filter out video devices without the pattern
      const filteredDevices = videoDevices.filter(({ label }) => pattern.test(label));

      resolve(chooseDeviceId(filteredDevices, videoDevices, facingMode));
    });
  });
}
