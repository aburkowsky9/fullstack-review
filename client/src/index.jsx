import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    var request = $.ajax({
      method: "POST",
      url: '/repos',
      data: {data: term}
    });

    request.done(function( msg ) {
      $( "#log" ).html( msg );
      this.setStat
    });
     
    request.fail(function( jqXHR, textStatus ) {
      console.log(jqXHR);
      alert( "Request failed: " + textStatus );
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));