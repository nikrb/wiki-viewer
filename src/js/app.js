import React from 'react';
import ReactDOM from 'react-dom';
import style from '../scss/app.scss';

// require('../../node_modules/bootstrap/dist/css/bootstrap.css');

class Main extends React.Component {
  render(){
    return (
      <div className="example container">
        <h1>This is one cool app!</h1>
      </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Main />, app);
