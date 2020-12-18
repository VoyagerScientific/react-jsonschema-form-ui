import _ from 'lodash';

class DeviceHelper {
  async getVideoInputDevices() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputDevices =  _.filter(devices, (device) => device.kind === "videoinput");
    return videoInputDevices;
  }

  getRearCamera(devices) {
    if (devices > 1) {
      const rearCamera = _.find(devices, (device) => {
        const deviceCapabilities=  device.getCapabilities();
        return _.intersection(deviceCapabilities.facingMode, ['user', 'environment']).length === 0;
      });
      return rearCamera;
    }
  }

  getFrontCamera(devices) {
    if (devices > 1) {
      const frontCamera = _.find(devices, (device) => {
        const deviceCapabilities=  device.getCapabilities();
        return _.intersection(deviceCapabilities.facingMode, ['user', 'environment']).length > 1;
      });
      return frontCamera;
    }
  }
}

export default new DeviceHelper();