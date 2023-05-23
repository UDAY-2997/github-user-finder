import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const User = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const user = await userResponse.json();
        setUserData(user);

        // Fetch repositories
        const repositoriesResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await repositoriesResponse.json();
        setRepositories(repos);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

   const options = {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }

     const formatDate = (date) => {
        const newDate = new Date(date).toLocaleDateString('en-CA', options);
        return newDate;
    }

  return (
    <div>
      {userData && (
        <div className='center'>
        <div className='intro'>
          <img src={userData.avatar_url} alt="Profile" />
          <h2>{userData.login}</h2>
          <div className='info'>
            <p><h3>{userData.public_repos}</h3>Repositories </p>
            <p><h3>{userData.followers}</h3>Followers </p>
            <p><h3> {userData.following}</h3>Following </p>
          </div>
           <div>
                    <button className='git-btn'
                        onClick={() => window.location.href = `https://github.com/${username}`}>
                        Go to Github
                    </button>
                </div>
        </div>
        </div>
      )}

 {repositories.length > 0 ? (
  <div className='grid-1'>
    <h2>Repositories</h2>
    <div>
      {repositories.map((repo) => (
        <div className='list' key={repo.id}>
          <div className='repo-info'>
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
          <div className='date'>
          <p>Updated at {formatDate(repo.updated_at)}</p>
          </div>
          </div>
          <div className='description'>
          <p> {repo.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
) : (
  <p>No repositories found</p>
)}

    </div>
  );
};
