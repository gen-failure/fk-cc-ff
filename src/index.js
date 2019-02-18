import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import PlaybackStore from './stores/playback';
import StorageStore from './stores/storage';
import UIStore from './stores/ui';

import {Provider} from 'mobx-react';

const stores = {
  playback: new PlaybackStore(),
  storage: new StorageStore(),
  ui: new UIStore()
}

Object.keys(stores).forEach((store) => {
  //Might looking a bit cryptical, but we just make individual stores aware of global stores collection
  stores[store].stores = stores //R
})

window.stores = stores //FIXME

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>, document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
