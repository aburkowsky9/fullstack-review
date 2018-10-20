import React from 'react';
import Repos from './Repos.jsx'

const RepoList = (props) => (
	<div>
	  <div>
	    <h4> Repo List Component </h4>
	    There are {props.repos.length} repos.
	  </div>
	  <div>
	  	<ol>
	  		{props.repos.map((repo) => (
	  				<Repos key={repo.repoId.toString()} repo={repo} />
	  			)
	  		)}
	  	</ol>
	  </div>
  </div>
)

export default RepoList;