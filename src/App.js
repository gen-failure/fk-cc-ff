import React, { Component } from 'react';

import Keyboard from './components/keyboard';
import InfoScreen from './components/info_screen';
import Toolbar from './components/toolbar';
import Library from './components/library';
import SaveDialog from './components/save-dialog';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <InfoScreen />
        <Keyboard />
        <SaveDialog />
        <Library />
      </div>
    );
  }
}

export default App;
