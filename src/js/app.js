import React from 'react';
import ReactDOM from 'react-dom';

import style from '../scss/app.scss';
/*
 * A simple React component
 */
class Application extends React.Component {
  constructor(){
    super();
    this.state = {
      search_text: "",
      fetch_results: []
    };
  }
  searchChange( e){
    this.setState( { search_text: e.currentTarget.value});
  }
  searchClicked( e){
    var that = this;
    const searchText = this.state.search_text;
    console.log( "search text:", searchText);
    // https://en.wikipedia.org/w/api.php?action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=json
    $.ajax({
      type: "get",
      // url: "http://en.wikipedia.org/w/api.php?action=query&titles="+searchText+"&prop=revisions&"+
      // "rvprop=content&rvlimit=1&format=json&callback=?",
      // url: "http://en.wikipedia.org/w/api.php?action=parse&page="+searchText+"&prop=text&format=json&callback=?",
      url: "http://en.wikipedia.org/w/api.php?action=query&"+
          "list=search&srsearch="+searchText+
          "&format=json&callback=?",
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      headers: { 'Api-User-Agent': 'freecodecamp.com/nikrb' },
      success: function (data, textStatus, jqXHR) {
        console.log( "wiki response:", data);

        that.setState( { fetch_results: data.query.search});
      },
      error: function (errorMessage) {
        console.error( "wiki search failed:", errorMessage);
      }
    });
  }
  /*
  <div dangerouslySetInnerHTML={this.getMarkup()} >
  getMarkup(){
    return { __html: this.state.results_table};
  }*/
  articleClicked( title){
    console.log( "article clicked title:", title);
    window.open( "https://en.wikipedia.org/wiki/"+title, title);
  }
  render() {
    const rows = this.state.fetch_results.map( ( ele, ndx) => {
      return (
        <div className="result-row" key={ndx} onClick={this.articleClicked.bind(this, ele.title)} >
          <h3>{ele.title}</h3><p dangerouslySetInnerHTML={{__html: ele.snippet}}></p>
        </div>
      );
    });
    
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
      <div>
        {rows}
      </div>
    </div>;
  }
}

/*
 * Render the above component into the div#app
 */
const app = document.getElementById('app');
ReactDOM.render(<Application />, app);
