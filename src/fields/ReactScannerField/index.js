import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Scanner from "./scanner";
import { BrowserMultiFormatReader } from '@zxing/library';
import DeviceHelper from '../../helpers/device';
import CenteredModal from '../../components/CenteredModal';
import { Spinner } from 'react-bootstrap';
import classNames from 'classnames';

const styles = {
  closeButton: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
  }
};

class ReactScannerField extends Component {

  constructor(props) {
    super(props);
    this.codeReader = new BrowserMultiFormatReader();
    this.state = {
      ...props,
      showScanner: false,
      value: null,
      showModal: false,
    };
  }

  handleChange = (codeValue) => {
    console.log(codeValue);
    this.props.onChange(codeValue);
    this.setState({ showScanner: false, value: codeValue });
  }

  handleScannerClose = () => {
    this.codeReader.stopStreams();
    this.setState({ showScanner: false });
  }

  handleScannerOpen = async () => {
    const isVideoAccessDenied = await DeviceHelper.isVideoAccessDenied();
    const isVideoAccessAsked = await DeviceHelper.isVideoAccessAsked();

    if (isVideoAccessDenied) {
      return this.setState({ isShowVideoAccessDenied: true });
    }

    if (isVideoAccessAsked) {
      try {
        this.setState({ handleShowVideoAccessAsked: true });
        await DeviceHelper.askVideoAccess();
        this.setState({ isShowVideoAccessDenied: false, isShowVideoAccessAsked: false });
      } catch(error) {
        return this.setState({ isShowVideoAccessDenied: true, isShowVideoAccessAsked: false });
      }
    }
    
    const devices = await DeviceHelper.getVideoInputDevices();
    if (devices.length > 0) {
      this.setState({ showScanner: true, devices });
    } else {
      return this.setState({ isShowVideoDevicesEmpty: true });
    }
  }
  
  handleShowVideoDevicesEmpty = () => {
    return this.setState({ isShowVideoDevicesEmpty: false });
  }

  handleShowVideoAccessDenied = () => {
    return this.setState({ isShowVideoAccessDenied: false });
  }

  _getScanner() {
    return ReactDOM.createPortal(
      (
        <div style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}>
          <Scanner
            codeReader={this.codeReader}
            codeType="datamatrix"
            onCode={this.handleChange} />
          <button style={styles.closeButton} onClick={this.handleScannerClose} className="btn btn-block btn-secondary">Close</button>
        </div>
      ),
      document.getElementsByTagName("body")[0]
    );
  }

  renderDisabledCameraPermissionPrompt() {
    return <div>
      <p>Make sure that you allowed us to use the cameras</p>
    </div>
  }

  renderLoaderWhileAsking() {
    return <div>
      <Spinner animation="border" />
    </div>
  }

  renderEmptyDevices() {
    return <div>
      { DeviceHelper.isIOSDevice() && (
        <p>Cannot detect camera because your phone is an IOS Device. You may only try this on Safari Browser. Only devices with WebRTC are allowed to use this feature</p>
      )}
      { !DeviceHelper.isIOSDevice() &&
        <p>Your device doesn't support cameras. Please find a device with at least one camera input</p>
      }
    </div>
  }

  render() {
    return (
      <span>
        <CenteredModal
          title="You disabled your camera"
          onHide={this.handleShowVideoAccessDenied}
          show={this.state.isShowVideoAccessDenied}>
          {this.renderDisabledCameraPermissionPrompt()}
        </CenteredModal>
        <CenteredModal
          title="Please wait..."
          onHide={this.handleShowVideoAccessAsked}
          show={this.state.isShowVideoAccessAsked}>
          {this.renderLoaderWhileAsking()}
        </CenteredModal>
        <CenteredModal
          title={DeviceHelper.isIOSDevice() ? "You are running on IOS" : "You have no camera"}
          onHide={this.handleShowVideoDevicesEmpty}
          show={this.state.isShowVideoDevicesEmpty}>
          {this.renderEmptyDevices()}
        </CenteredModal>
        {this.state.showScanner ?
          this._getScanner()
          :
          <span>
            {this.state.value &&
              <span className="mr-2">{this.state.value}</span>
            }
            <button onClick={this.handleScannerOpen} className={classNames({
              btn: true,
              "btn-sm": true,
              "btn-secondary": !DeviceHelper.isIOSDevice(),
              "btn-danger": DeviceHelper.isIOSDevice()
            })}>Scan</button>
            {this.state.value &&
              <button onClick={() => {
                const clearValue = confirm("Are you sure?");
                if (clearValue)
                  this.setState({ value: null })
              }} className="btn btn-sm btn-secondary ml-1">&times;</button>
            }
          </span>
        }
      </span>
    );
  }
}

export default ReactScannerField;
