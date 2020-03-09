import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import textLogo from './images/DFTextTransparant.png'
import Main from './Main'

ReactDOM.render(<Main/>, document.getElementById("navbar"));
ReactDOM.render(<img src={textLogo} alt="nameLogo" />, document.getElementById('nameLogo'));


