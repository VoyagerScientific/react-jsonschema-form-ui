import _ from 'lodash';

class DeviceHelper {
  async getVideoInputDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices() || [];
    const videoInputDevices = _.filter(devices, (device) => device.kind === "videoinput");
    return videoInputDevices;
  }

  async askVideoAccess() {
    return new Promise((resolve, reject) => navigator.getUserMedia({ video: true }, resolve, reject));
  }

  async isVideoAccessDenied() {
    try {
      const permission = await navigator.permissions.query({
        name: 'camera'
      });
      return permission.state === 'denied';
    } catch (error) {
      return false;
    }
  }

  async isVideoAccessAsked() {
    try {
      const permission = await navigator.permissions.query({
        name: 'camera'
      });
      return permission.state === 'prompt';
    } catch (error) {
      return false;
    }
  }

  async isVideoDevicesAccessible() {
    try {
      const permission = await navigator.permissions.query({
        name: 'camera'
      });
      return permission.state !== 'denied';
    } catch (error) {
      return false;
    }
  }

  getRearCamera(devices) {
    if (devices > 1) {
      const rearCamera = _.find(devices, (device) => {
        const deviceCapabilities = device.getCapabilities();
        return _.intersection(deviceCapabilities.facingMode, ['user', 'environment']).length === 0;
      });
      return rearCamera;
    }
  }

  getFrontCamera(devices) {
    if (devices > 1) {
      const frontCamera = _.find(devices, (device) => {
        const deviceCapabilities = device.getCapabilities();
        return _.intersection(deviceCapabilities.facingMode, ['user', 'environment']).length > 1;
      });
      return frontCamera;
    }
  }

  isIOSDevice = () => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }
}

export default new DeviceHelper();