import React, { Component } from 'react';
import { render } from 'react-dom';
import createServer from '../../server';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';


class Demo extends Component {
  render() {
    return (
      <div className="container">
        <br /><br />
        <h1 className="d-print-none">React JSON-Schema UI Fields &amp; Widgets</h1>
        <App />
      </div>
    )
  }
}

createServer();
render(<Demo />, document.querySelector('#demo'))
