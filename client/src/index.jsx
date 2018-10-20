import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Requests from './requests.js'
import Repos from './components/Repos.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
    this.getTopRepos = this.getTopRepos.bind(this);
  }

  componentDidMount() {
    Requests.read((data) => {
      this.setState({repos: data});
    });
  }

  search(term) {
    Requests.create(term, (msg) => {
      console.log('in search!', msg)
      this.getTopRepos();
    })
  }

  getTopRepos() {
    console.log('here in getTopRepos');
    Requests.read((data) => {
      this.setState({repos: data});
    });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));