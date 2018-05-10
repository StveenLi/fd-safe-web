import React, { Component } from 'react';

import Routers from './components/common/routes'
//import ModalGallery from './components/common/test'
import {
    BrowserRouter as Router,
} from 'react-router-dom'





class App extends Component {


  render() {
    return (
        <Router forceRefresh={true} >

            <Routers></Routers>
        </Router>
    );
  }
}

export default App;
