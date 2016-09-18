import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import style from '../scss/app.scss';
/*
 * A simple React component
 */
class Application extends React.Component {
  constructor(){
    super();
    this.state = {
      search_text: ""
    };
  }
  searchChange( e){
    this.setState( { search_text: e.currentTarget.value});
  }
  searchClicked( e){
    // https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
    axios({
      method: 'get',
      url: "//en.wikipedia.org/w/api.php",
      params: {
        action: "query",
        titles: this.state.search_text,
        prop: "revisions",
        rvprop: "content",
        format: "json"
      },
      headers: { 'Api-User-Agent': 'freecodecamp.com/nikrb' }
    })
    .then( (response) => {
      console.log( "wiki response:", response.data);
    })
    .catch( (err) => {
      console.error( "wikipedia search failed:", err);
    });
  }
  render() {
    return <div>
      <h1>Wiki Viewer</h1>
      <div id="random-article">
        <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">Click here for a random article</a>
      </div>
      <div id="search-article">
        <input type="text" className="rounding-box"
          onChange={this.searchChange.bind(this)}
          value={this.state.search_text}
          placeholder="Search text ..." />
        <button className="my-button"
          onClick={this.searchClicked.bind(this)}>Search</button>
      </div>
    </div>;
  }
}

/*
 * Render the above component into the div#app
 */
const app = document.getElementById('app');
ReactDOM.render(<Application />, app);
