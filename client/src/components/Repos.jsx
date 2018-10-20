import React from 'react';

const Repos = (props) => (
	<li>
	{`${props.repo.repoOwner}: ${props.repo.url}, Forks- ${props.repo.forks}`}
	</li>
)

export default Repos;