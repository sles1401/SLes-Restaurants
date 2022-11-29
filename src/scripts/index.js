/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
import { WebSocketInitiator } from './utils/websocket-initiator';
import CONFIG from './globals/config';
import App from './views/app';
import swRegister from '../scripts/utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/main.css';
import '../styles/responsive.css';
import 'regenerator-runtime'; /* for async await transpile */

const app = new App({
    button: document.querySelector('#hamburgerButton'),
    drawer: document.querySelector('#navigationDrawer'),
    content: document.querySelector('#maincontent'),
    main: document.querySelector('maincontent'),
});
window.addEventListener('hashchange', () => {
    app.renderPage();
});

window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
    WebSocketInitiator.init(CONFIG.WEB_SOCKET_SERVER);
});
