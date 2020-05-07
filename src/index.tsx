import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ipcRenderer } from 'electron';

import drugsStore from './stores/drugsStore';
import App from './components/App';
import './index.css';

ipcRenderer.send('bootstrap');
ipcRenderer.once('bootstrap-success', (_, data) => {
    drugsStore.setRawData(data.drugs);

    ReactDOM.render(
        <React.StrictMode>
            <HashRouter>
                <App />
            </HashRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
});
