let React = require('react');
let ReactDOM = require('react-dom');

let epg = document.getElementById('epg-window');
let now = document.getElementById('now-next-channels');

import Channels from './Channels';
import Now from './Now';

switch(true){
    case hasClass(document.body,'tvguide'):
        ReactDOM.render(<Channels />, epg);
        console.log(epgData);
        break;
    case hasClass(document.body,'live'):
        ReactDOM.render(<Now />, now);
        console.log(nowData);
        break;
}


